import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';
import { List, Button, Card, Typography, Tag } from 'antd';
import { blue } from '@ant-design/colors';
import { ProjectModal } from '../../components/ProjectModal';
import { withLoader, withAuthorization } from '../../components/hoc';
import {
  ProjectsRepository,
  EmployeesRepository,
  ActivityRepository,
} from '../../services/repositories';
import { DATES_FORMATS } from '../../constants/datesFormats';
import { ROUTES } from '../../constants/routes';
import { ACTIVITY } from '../../constants/activity';
import { IProject } from '../../definitions';
import { EmployeeContext } from './../../context';
import { IState, Props } from './types';
import styles from './styles.module.scss';

class _Projects extends React.Component<Props, IState> {
  static contextType = EmployeeContext;
  context!: React.ContextType<typeof EmployeeContext>;

  state: IState = {
    projects: [],
    visible: false,
  };

  componentDidMount() {
    this.props
      .fetching(ProjectsRepository.getAll())
      .then((projects) => this.setState({ projects }));
  }

  setVisible = (visible: boolean) => this.setState({ visible });

  onSubmit = async (values: Pick<IProject, 'title' | 'description'>) => {
    const { id: employeeId } = this.context.employee!;
    const projectRes = await this.props.fetching(
      ProjectsRepository.create({
        title: values.title,
        description: values.description,
        issuesCount: 0,
        authorId: employeeId,
      }),
    );

    const { id: projectId } = projectRes;
    const link = ROUTES.PROJECTS.DETAIL.ROUTE(projectId);

    await this.props.fetching(
      Promise.all([
        ActivityRepository.create(employeeId, {
          text: ACTIVITY.PROJECTS.CREATED,
          date: moment().format(DATES_FORMATS.FULL_FORMAT),
          type: 'project',
          link,
        }),
        EmployeesRepository.update(employeeId, { projectId }),
      ]),
    );

    this.context.setEmployee({
      ...this.context.employee!,
      projectId,
    });
    this.setVisible(false);
    this.props.history.push(link);
  };

  getButton() {
    if (this.context.employee?.projectId) {
      return null;
    }

    return (
      <Button type='primary' onClick={() => this.setVisible(true)}>
        Create project
      </Button>
    );
  }

  render() {
    return (
      <div className={styles.projects}>
        <Typography.Title>Projects list</Typography.Title>
        {this.getButton()}
        <List
          className={styles.list}
          grid={{ gutter: 16, column: 4 }}
          dataSource={this.state.projects}
          loading={false}
          loadMore={false}
          locale={{ emptyText: 'Projects list is empty' }}
          renderItem={(item) => {
            const title = (
              <>
                <div>{item.title}</div>
                {this.context.employee?.projectId === item.id && (
                  <Tag color={blue.primary}>My project</Tag>
                )}
              </>
            );

            return (
              <List.Item>
                <Card title={title} className={styles.card}>
                  <div className={styles.info}>
                    <div>{item.description}</div>
                    <div>{item.issuesCount}</div>
                  </div>
                  <Link to={ROUTES.PROJECTS.DETAIL.ROUTE(item.id)}>View board</Link>
                </Card>
              </List.Item>
            );
          }}
        />
        <ProjectModal
          title='Create project'
          buttonText='Create'
          visible={this.state.visible}
          setVisible={this.setVisible}
          values={{
            title: '',
            description: '',
          }}
          onSubmit={this.onSubmit}
          loading={this.props.loading}
        />
      </div>
    );
  }
}

export const Projects = withAuthorization(withRouter(withLoader(_Projects)));
