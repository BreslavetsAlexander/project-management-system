import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Result, Typography, List, Button } from 'antd';
import {
  HeatMapOutlined,
  UserOutlined,
  ClockCircleOutlined,
  ReadOutlined,
  GithubOutlined,
  UnorderedListOutlined,
  HistoryOutlined,
} from '@ant-design/icons';
import { IWithLoaderProps, withLoader } from './../../components/hoc';
import { ProjectsRepository, ActivityRepository } from './../../services/repositories';
import { ROUTES } from './../../constants/routes';
import { EmployeeContext } from './../../context';
import { prepareData } from './../../utils';
import { IState } from './types';
import styles from './styles.module.scss';

class _Home extends React.Component<IWithLoaderProps, IState> {
  static contextType = EmployeeContext;
  context!: React.ContextType<typeof EmployeeContext>;

  state: IState = {
    project: null,
    activity: [],
  };

  componentDidMount() {
    if (!this.context.employee) {
      return;
    }

    const { projectId } = this.context.employee;
    const projectPromise = projectId
      ? ProjectsRepository.getById(projectId)
      : Promise.resolve(null);
    const activityPromise = ActivityRepository.getAll();
    this.props
      .fetching(Promise.all([projectPromise, activityPromise]))
      .then(([res, activityRes]) => {
        const activity = prepareData(activityRes);

        if (!res || !projectId) {
          this.setState({ activity });
          return;
        }

        const project = {
          ...res,
          id: projectId,
          issues: prepareData(res.issues),
        };
        this.setState({ activity, project });
      });
  }

  getIntroduction() {
    return (
      <div className={styles.introduction}>
        <div className={styles.sectionTitle}>
          <ReadOutlined /> Introduction
        </div>
        <Result
          className={styles.result}
          icon={<HeatMapOutlined />}
          title='Welcome to JIRA Clone'
        />
        <p className={styles.text}>
          Welcome to JIRA Clone! Using this app you can create projects, work in issues, discuss
          them
          <br />
          Source code here:{' '}
          <span>
            <a href='https://github.com/BreslavetsAlexander/project-management-system'>
              <GithubOutlined /> project-management-system
            </a>
          </span>
        </p>
      </div>
    );
  }

  getNotAuthorizedBlock() {
    return (
      <div className={styles.login}>
        <p>Sorry, you are not authorized to access this information</p>
        <Button type='primary' className={styles.button}>
          <Link to={ROUTES.LOG_IN}>Log in</Link>
        </Button>
      </div>
    );
  }

  getAssignedToMe() {
    const list = (
      <List
        size='large'
        dataSource={this.state.project?.issues}
        locale={{ emptyText: 'No assigned issues' }}
        renderItem={(item) => (
          <List.Item className={styles.listItem}>
            <Link to={ROUTES.PROJECTS.ISSUE.ROUTE(item.project.id, item.id)}>
              {`[${item.project.title}] - ${item.title}`}
            </Link>
            <div>{item.status}</div>
          </List.Item>
        )}
      />
    );

    const content = this.context.employee ? list : this.getNotAuthorizedBlock();

    return (
      <div className={styles.assignedToMe}>
        <div className={styles.sectionTitle}>
          <UnorderedListOutlined /> Assigned to Me
        </div>
        {content}
      </div>
    );
  }

  getActivityStream() {
    const list = (
      <List
        className={styles.list}
        itemLayout='horizontal'
        dataSource={this.state.activity.reverse()}
        locale={{ emptyText: 'Empty activity stream' }}
        renderItem={(item) => {
          const title = (
            <p>
              {`${item.employee.firstName} ${item.employee.lastName} ${item.text} ${item.entity.name}`}
            </p>
          );
          const description = (
            <p>
              <ClockCircleOutlined />
              {item.date}
            </p>
          );

          return (
            <List.Item className={styles.listItem}>
              <List.Item.Meta
                avatar={<UserOutlined className={styles.userIcon} />}
                title={title}
                description={description}
              />
            </List.Item>
          );
        }}
      />
    );

    const content = this.context.employee ? list : this.getNotAuthorizedBlock();

    return (
      <div className={styles.activityStream}>
        <div className={styles.sectionTitle}>
          <HistoryOutlined /> Activity Stream
        </div>
        {content}
      </div>
    );
  }

  render() {
    return (
      <div>
        <Typography.Title>Home</Typography.Title>
        <Row gutter={[24, 0]} className={styles.home}>
          <Col sm={12}>
            {this.getIntroduction()}
            {this.getAssignedToMe()}
          </Col>
          <Col sm={12}>{this.getActivityStream()}</Col>
        </Row>
      </div>
    );
  }
}

export const Home = withLoader(_Home);
