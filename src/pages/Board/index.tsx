import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';
import { Typography, Button, Modal, Form } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
import { FormSelect } from '../../components/FormSelect';
import { withLoader } from '../../components/hoc';
import { ProjectModal } from '../../components/ProjectModal';
import { IssueModal } from '../../components/IssueModal';
import { ProjectEmployees } from '../../components/Board/ProjectEmployees';
import { NoAccess } from '../../components/NoAccess';
import { ROUTES } from '../../constants/routes';
import { ACTIVITY } from '../../constants/activity';
import { DATES_FORMATS } from '../../constants/datesFormats';
import { ISSUES } from '../../constants/issues';
import { IEmployee, IProject, IIssue } from '../../definitions';
import {
  ProjectsRepository,
  IssuesRepository,
  EmployeesRepository,
  ActivityRepository,
} from '../../services/repositories';
import { EmployeeContext } from './../../context';
import { IProps, IState, IFormValues } from './types';
import styles from './styles.module.scss';

class _Board extends React.Component<IProps, IState> {
  formRef = React.createRef<FormInstance<IFormValues>>();
  static contextType = EmployeeContext;
  context!: React.ContextType<typeof EmployeeContext>;

  state: IState = {
    project: null,
    employees: [],
    projectEmployees: [],
    projectIssues: [],
    projectModalVisible: false,
    issueModalVisible: false,
  };

  getEmployee() {
    return {
      id: this.context.employee?.id!,
      firstName: this.context.employee?.firstName!,
      lastName: this.context.employee?.lastName!,
    };
  }

  isEmployeeProject() {
    return this.context.employee?.projectId === this.props.match.params.id;
  }

  componentDidMount() {
    if (!this.isEmployeeProject()) {
      return;
    }

    const { id } = this.props.match.params;
    const projectPromise = ProjectsRepository.getById(id);
    const employeesPromise = EmployeesRepository.getAll();
    const issuesPromise = IssuesRepository.getAll();

    this.props
      .fetching(Promise.all([projectPromise, employeesPromise, issuesPromise]))
      .then(([project, employees, issues]) => {
        const projectEmployees = employees.filter((employee) => employee.projectId === id);
        const projectIssues = issues.filter((issue) => issue.projectId === id);

        this.setState({
          project,
          employees,
          projectEmployees,
          projectIssues,
        });
      });
  }

  setProjectModalVisible = (projectModalVisible: boolean) => this.setState({ projectModalVisible });

  setIssueModalVisible = (issueModalVisible: boolean) => this.setState({ issueModalVisible });

  onEdit = (values: Pick<IProject, 'title' | 'description'>) => {
    if (!this.state.project) {
      return null;
    }

    const { id } = this.state.project;
    const updatedProject = {
      title: values.title,
      description: values.description,
    };

    this.props
      .fetching(
        Promise.all([
          ProjectsRepository.update(id, updatedProject),
          ActivityRepository.create(this.getEmployee().id, {
            text: ACTIVITY.PROJECTS.UPDATED,
            date: moment().format(DATES_FORMATS.FULL_FORMAT),
            type: 'project',
            link: ROUTES.PROJECTS.DETAIL.ROUTE(this.props.match.params.id),
          }),
        ]),
      )
      .then(() => {
        this.setState({
          project: {
            ...this.state.project,
            ...updatedProject,
            id,
          } as IProject,
        });
        this.setProjectModalVisible(false);
      });
  };

  onDelete = () => {
    return Modal.confirm({
      title: 'Are you sure you want to delete the project?',
      icon: null,
      okText: 'Delete',
      okButtonProps: {
        danger: true,
      },
      onOk: () => {
        const project = ProjectsRepository.delete(this.props.match.params.id);
        const issues = this.state.projectIssues.map((item) => IssuesRepository.delete(item.id));
        const employees = this.state.projectEmployees.map((item) =>
          EmployeesRepository.update(item.id, {
            projectId: null,
          }),
        );
        const activity = ActivityRepository.create(this.getEmployee().id, {
          text: ACTIVITY.PROJECTS.DELETED,
          date: moment().format(DATES_FORMATS.FULL_FORMAT),
          type: 'project',
          link: ROUTES.PROJECTS.DETAIL.ROUTE(this.props.match.params.id),
        });

        return Promise.all([project, issues, employees, activity]).then(() => {
          if (this.context.employee?.projectId === this.props.match.params.id) {
            this.context.setEmployee({
              ...this.context.employee,
              projectId: null,
            });
          }
          this.props.history.push(ROUTES.PROJECTS.LIST);
        });
      },
    });
  };

  onCreate = (values: Pick<IIssue, 'title' | 'description' | 'priority' | 'originalEstimate'>) => {
    if (!this.state.project || !this.context.employee) {
      return;
    }

    const { id: projectId } = this.state.project;
    const { id: employeeId } = this.context.employee;

    const issuePromise = IssuesRepository.create({
      ...values,
      status: ISSUES.STATUSES.TO_DO,
      assigneeId: employeeId,
      authorId: employeeId,
      projectId,
      comments: [],
      worklogs: [],
    });

    const projectPromise = ProjectsRepository.update(this.props.match.params.id, {
      issuesCount: this.state.project.issuesCount + 1,
    });

    const activityPromise = ActivityRepository.create(this.getEmployee().id, {
      text: ACTIVITY.PROJECTS.ADDED_ISSUE,
      date: moment().format(DATES_FORMATS.FULL_FORMAT),
      type: 'project',
      link: ROUTES.PROJECTS.DETAIL.ROUTE(this.props.match.params.id),
    });

    this.props
      .fetching(Promise.all([issuePromise, activityPromise, projectPromise]))
      .then(([issue]) => {
        this.setIssueModalVisible(false);
        this.props.history.push(ROUTES.PROJECTS.ISSUE.ROUTE(projectId, issue.id));
      });
  };

  onAddEmployee = (employeeId: IFormValues['employeeId']) => {
    this.props
      .fetching(
        Promise.all([
          EmployeesRepository.update(employeeId, {
            projectId: this.props.match.params.id,
          }),
          ActivityRepository.create(this.getEmployee().id, {
            text: ACTIVITY.PROJECTS.ADDED_EMPLOYEE,
            date: moment().format(DATES_FORMATS.FULL_FORMAT),
            type: 'project',
            link: ROUTES.PROJECTS.DETAIL.ROUTE(this.props.match.params.id),
          }),
        ]),
      )
      .then(() => {
        this.formRef.current?.resetFields();
        const projectEmployee = this.state.employees.find((item) => item.id === employeeId)!;
        const employees = this.state.employees.filter((item) => item.id !== employeeId)!;
        const projectEmployees = [...this.state.projectEmployees];
        projectEmployees.push(projectEmployee);
        this.setState({
          employees,
          projectEmployees,
        });

        if (employeeId === this.context.employee?.id) {
          this.context.setEmployee({
            ...this.context.employee,
            projectId: this.props.match.params.id,
          });
        }
      });
  };

  onLeaveProject = (id: IEmployee['id']) => {
    const employeePromise = EmployeesRepository.update(id, { projectId: null });
    const issues = this.state.projectIssues
      .filter((issue) => issue.assigneeId === id)
      .map((issue) =>
        IssuesRepository.update(issue.id, {
          assigneeId: issue.authorId,
        }),
      );

    this.props.fetching(Promise.all([employeePromise, issues])).then(() => {
      const projectEmployees = this.state.projectEmployees.filter((item) => item.id !== id)!;
      const employee = this.state.projectEmployees.find((item) => item.id === id)!;
      this.setState({
        employees: [...this.state.employees, employee],
        projectEmployees,
      });

      if (id === this.context.employee?.id) {
        this.context.setEmployee({
          ...this.context.employee,
          projectId: null,
        });
      }

      this.props.history.push(ROUTES.PROJECTS.LIST);
    });
  };

  getSelect() {
    const selectOptions = this.state.employees
      .filter((employee) => !employee.projectId)
      .map((item) => {
        return {
          title: `${item.firstName} ${item.lastName}`,
          value: item.id,
        };
      });

    return (
      <Form<IFormValues>
        ref={this.formRef}
        onValuesChange={(_, values) => this.onAddEmployee(values.employeeId)}>
        <FormSelect
          message='+ Add employee to project'
          name='employeeId'
          options={selectOptions}
          empty='Sorry, but all employees are busy. You cannot add new employee'
        />
      </Form>
    );
  }

  getButtons() {
    if (this.context.employee?.id === this.state.project?.authorId) {
      return (
        <div className={styles.buttons}>
          <Button icon={<EditOutlined />} onClick={() => this.setProjectModalVisible(true)}>
            Edit
          </Button>
          <Button icon={<DeleteOutlined />} danger type='primary' onClick={this.onDelete}>
            Delete
          </Button>
          <Button
            icon={<PlusOutlined />}
            type='primary'
            onClick={() => this.setIssueModalVisible(true)}>
            Create issue
          </Button>
          {this.getSelect()}
        </div>
      );
    }

    return null;
  }

  render() {
    if (!this.isEmployeeProject()) {
      return (
        <NoAccess
          title='You cannot see this project'
          subTitle='Go to Projects list'
          extra={
            <Button type='primary'>
              <Link to={ROUTES.PROJECTS.LIST}>Projects list</Link>
            </Button>
          }
        />
      );
    }

    if (!this.state.project) {
      return null;
    }

    return (
      <div className={styles.board}>
        <Link to={ROUTES.PROJECTS.LIST}>
          <ArrowLeftOutlined className={styles.icon} />
          <span>Projects list</span>
        </Link>
        <Typography.Title>{this.state.project.title}</Typography.Title>
        {this.getButtons()}
        <ProjectEmployees
          employees={this.state.projectEmployees}
          issues={this.state.projectIssues}
          currentEmployeeId={this.getEmployee().id}
          onLeaveProject={this.onLeaveProject}
        />
        <ProjectModal
          title='Edit project'
          buttonText='Edit'
          visible={this.state.projectModalVisible}
          setVisible={this.setProjectModalVisible}
          values={{
            title: this.state.project?.title!,
            description: this.state.project?.description!,
          }}
          onSubmit={this.onEdit}
          loading={this.props.loading}
        />
        <IssueModal
          title='Create issue'
          buttonText='Create'
          visible={this.state.issueModalVisible}
          setVisible={this.setIssueModalVisible}
          values={{
            title: '',
            description: '',
            priority: ISSUES.PRIORITIES.LOW.name,
            originalEstimate: {
              d: 0,
              h: 0,
              m: 10,
            },
          }}
          onSubmit={this.onCreate}
          loading={this.props.loading}
        />
      </div>
    );
  }
}

export const Board = withRouter(withLoader(_Board));
