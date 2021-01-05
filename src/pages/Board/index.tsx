import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';
import { Collapse, Typography, Button, Modal, Form } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
import { AccordionContent } from '../../components/Board/AccordionContent';
import { FormSelect } from '../../components/FormSelect';
import { withLoader } from '../../components/hoc';
import { ProjectModal } from '../../components/ProjectModal';
import { IssueModal } from '../../components/IssueModal';
import { ROUTES } from '../../constants/routes';
import { ACTIVITY } from '../../constants/activity';
import { DATES_FORMATS } from '../../constants/datesFormats';
import { ISSUES } from '../../constants/issues';
import { IProject, IIssue } from '../../definitions';
import {
  ProjectsRepository,
  IssuesRepository,
  EmployeesRepository,
  ActivityRepository,
} from '../../services/repositories';
import { EmployeeContext } from './../../context';
import { prepareData } from '../../utils';
import { IProps, IState, IFormValues } from './types';
import styles from './styles.module.scss';

class _Board extends React.Component<IProps, IState> {
  formRef = React.createRef<FormInstance<IFormValues>>();
  static contextType = EmployeeContext;
  context!: React.ContextType<typeof EmployeeContext>;

  state: IState = {
    project: null,
    employees: [],
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

  componentDidMount() {
    const { id } = this.props.match.params;

    const projectPromise = ProjectsRepository.getById(id);
    const employeePromise = EmployeesRepository.getAll();
    this.props
      .fetching(Promise.all([projectPromise, employeePromise]))
      .then(([projectRes, employeeRes]) => {
        this.setState({
          project: {
            ...projectRes,
            id,
            issues: prepareData(projectRes.issues),
          },
          employees: prepareData(employeeRes),
        });
      });
  }

  setProjectModalVisible = (projectModalVisible: boolean) => this.setState({ projectModalVisible });

  setIssueModalVisible = (issueModalVisible: boolean) => this.setState({ issueModalVisible });

  onEdit = (values: Pick<IProject, 'title' | 'description'>) => {
    if (!this.state.project) {
      return null;
    }

    const { id, issues } = this.state.project;
    const updatedProject = {
      title: values.title,
      description: values.description,
    };

    Promise.all([
      ProjectsRepository.update(id, updatedProject),
      ActivityRepository.create({
        employee: this.getEmployee(),
        date: moment().format(DATES_FORMATS.FULL_FORMAT),
        entity: {
          id: this.state.project.id!,
          name: this.state.project?.title!,
        },
        text: ACTIVITY.PROJECTS.UPDATED,
        type: 'issue',
      }),
    ]).then(() => {
      this.setState({
        project: {
          ...updatedProject,
          issues,
          id,
        },
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
        return Promise.all([
          ProjectsRepository.delete(this.state.project?.id!),
          ActivityRepository.create({
            employee: this.getEmployee(),
            date: moment().format(DATES_FORMATS.FULL_FORMAT),
            entity: {
              id: this.state.project?.id!,
              name: this.state.project?.title!,
            },
            text: ACTIVITY.PROJECTS.DELETED,
            type: 'issue',
          }),
        ]).then(() => {
          this.props.history.push(ROUTES.PROJECTS.LIST);
        });
      },
    });
  };

  onCreate = (values: Pick<IIssue, 'title' | 'description' | 'priority' | 'originalEstimate'>) => {
    if (!this.state.project || !this.context.employee) {
      return;
    }

    const employee = {
      id: this.context.employee.id,
      firstName: this.context.employee.firstName,
      lastName: this.context.employee.lastName,
    };

    const { id: projectId } = this.state.project;

    const issuePromise = IssuesRepository.create(projectId, {
      ...values,
      status: ISSUES.STATUSES.TO_DO,
      assignee: employee,
      author: employee,
      project: {
        id: projectId,
        title: this.state.project.title,
      },
    });

    const activityPromise = ActivityRepository.create({
      employee: this.getEmployee(),
      date: moment().format(DATES_FORMATS.FULL_FORMAT),
      entity: {
        id: projectId,
        name: this.state.project.title,
      },
      text: ACTIVITY.PROJECTS.ADDED_ISSUE,
      type: 'issue',
    });

    Promise.all([issuePromise, activityPromise]).then(([issue]) => {
      this.setIssueModalVisible(false);
      this.props.history.push(ROUTES.PROJECTS.ISSUE.ROUTE(projectId, issue.name));
    });
  };

  onAddEmployee = (employeeId: IFormValues['employeeId']) => {
    this.props
      .fetching(
        Promise.all([
          EmployeesRepository.update(employeeId, {
            projectId: this.props.match.params.id,
          }),
          ActivityRepository.create({
            employee: this.getEmployee(),
            date: moment().format(DATES_FORMATS.FULL_FORMAT),
            entity: {
              id: this.state.project?.id!,
              name: this.state.project?.title!,
            },
            text: ACTIVITY.PROJECTS.ADDED_EMPLOYEE,
            type: 'issue',
          }),
        ]),
      )
      .then(() => {
        this.formRef.current?.resetFields();

        if (employeeId === this.context.employee?.id) {
          this.context.setEmployee({
            ...this.context.employee,
            projectId: this.props.match.params.id,
          });
        }
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
        <FormSelect message='+ Add employee to project' name='employeeId' options={selectOptions} />
      </Form>
    );
  }

  render() {
    if (!this.state.project) {
      return null;
    }

    const collapsePanels = this.state.employees
      .filter((employee) => employee.projectId === this.props.match.params.id)
      .map((employee) => {
        const issues =
          this.state.project?.issues.filter((issue) => issue.assignee.id === employee.id) || [];
        const header = (
          <div className={styles.header}>
            <span className={styles.name}>{`${employee.firstName} ${employee.lastName}`}</span>
            <span className={styles.count}>{issues.length} issue(s)</span>
          </div>
        );

        return (
          <Collapse.Panel
            key={employee.id}
            header={header}
            className={styles.panel}
            collapsible={issues.length === 0 ? 'disabled' : 'header'}
            showArrow={issues.length > 0}>
            <AccordionContent issues={issues} />
          </Collapse.Panel>
        );
      });

    return (
      <div className={styles.board}>
        <Link to={ROUTES.PROJECTS.LIST}>
          <ArrowLeftOutlined className={styles.icon} />
          <span>Projects list</span>
        </Link>
        <Typography.Title>{this.state.project?.title}</Typography.Title>
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
        <Collapse bordered={false} accordion className={styles.collapse}>
          {collapsePanels}
        </Collapse>
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
        />
      </div>
    );
  }
}

export const Board = withRouter(withLoader(_Board));
