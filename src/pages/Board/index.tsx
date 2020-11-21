import React from 'react';
import { withRouter } from 'react-router-dom';
import { Collapse, Typography, Button, Modal } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { AccordionContent } from '../../components/Board/AccordionContent';
import { ProjectModal } from '../../components/ProjectModal';
import { IssueModal } from '../../components/IssueModal';
import { IProps as IValues } from '../../components/ProjectModal/types';
import { IProps as IIssueProps } from '../../components/IssueModal/types';
import { LayoutContent } from '../../components/LayoutContent';
import { ROUTES } from '../../constants/routes';
import { ISSUES } from '../../constants/issues';
import {
  ProjectsRepository,
  IssuesRepository,
  EmployeesRepository,
} from '../../services/repositories';
import { IProps, IState } from './types';
import styles from './styles.module.scss';

class _Board extends React.Component<IProps, IState> {
  state: IState = {
    project: null,
    projectEmployees: null,
    projectModalVisible: false,
    issueModalVisible: false,
  };

  componentDidMount() {
    const projectPromise = ProjectsRepository.getById(this.props.match.params.id);
    const issuesPromise = IssuesRepository.getAll({ currentProjectId: this.props.match.params.id });
    const employeesPromise = EmployeesRepository.getAll({
      currentProjectId: this.props.match.params.id,
    });

    Promise.all([projectPromise, issuesPromise, employeesPromise]).then(
      ([project, issuesList, employees]) => {
        const projectEmployees = employees.map((employee) => {
          return {
            ...employee,
            issues: issuesList.filter((issue) => issue.currentEmployeeId === employee.id),
          };
        });

        this.setState({
          project,
          projectEmployees,
        });
      },
    );
  }

  setProjectModalVisible = (projectModalVisible: boolean) => this.setState({ projectModalVisible });

  setIssueModalVisible = (issueModalVisible: boolean) => this.setState({ issueModalVisible });

  onEdit = (values: IValues['values']) => {
    ProjectsRepository.update(this.state.project?.id!, {
      title: values.title,
      description: values.description,
    }).then((project) => {
      this.setState({ project });
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
        return ProjectsRepository.delete(this.state.project?.id!).then(() => {
          this.props.history.push(ROUTES.PROJECTS.LIST);
        });
      },
    });
  };

  onCreate = (values: IIssueProps['values']) => {
    IssuesRepository.create({
      title: values.title,
      description: values.description,
      currentEmployeeId: 1,
      currentProjectId: this.state.project?.id,
      authorId: 1,
      status: ISSUES.STATUSES.TO_DO,
      priority: values.priority,
    }).then((issue) => {
      this.setIssueModalVisible(false);
      this.props.history.push(ROUTES.ISSUES.DETAIL.ROUTE(issue.id));
    });
  };

  render() {
    if (!this.state.projectEmployees && !this.state.project) {
      return null;
    }

    const collapsePanels = this.state.projectEmployees?.map((item) => {
      const header = (
        <div className={styles.header}>
          <span className={styles.name}>{item.name}</span>
          <span className={styles.count}>{item.issues.length} issues</span>
        </div>
      );

      return (
        <Collapse.Panel
          key={item.id}
          header={header}
          className={styles.panel}
          disabled={item.issues.length === 0}
          showArrow={item.issues.length > 0}>
          <AccordionContent issues={item.issues} />
        </Collapse.Panel>
      );
    });

    return (
      <LayoutContent className={styles.board}>
        <Typography.Title>{this.state.project?.title}</Typography.Title>
        <div className={styles.buttons}>
          <Button icon={<EditOutlined />} onClick={() => this.setProjectModalVisible(true)}>
            Edit
          </Button>
          <Button danger type='primary' onClick={this.onDelete}>
            Delete
          </Button>
          <Button type='primary' onClick={() => this.setIssueModalVisible(true)}>
            Create issue
          </Button>
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
          }}
          onSubmit={this.onCreate}
        />
      </LayoutContent>
    );
  }
}

export const Board = withRouter(_Board);
