import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Row, Col, Typography, List, Button } from 'antd';
import {
  UserOutlined,
  ClockCircleOutlined,
  ReadOutlined,
  GithubOutlined,
  UnorderedListOutlined,
  HistoryOutlined,
} from '@ant-design/icons';
import { IWithLoaderProps, withLoader } from './../../components/hoc';
import { Logo } from './../../components/Logo';
import {
  ProjectsRepository,
  IssuesRepository,
  EmployeesRepository,
} from './../../services/repositories';
import { ROUTES } from './../../constants/routes';
import { DATES_FORMATS } from './../../constants/datesFormats';
import { EmployeeContext } from './../../context';
import { IState, IEmployeeActivity } from './types';
import styles from './styles.module.scss';

class _Home extends React.Component<IWithLoaderProps, IState> {
  static contextType = EmployeeContext;
  context!: React.ContextType<typeof EmployeeContext>;

  state: IState = {
    project: null,
    activity: [],
    issues: [],
  };

  componentDidMount() {
    if (!this.context.employee) {
      return;
    }

    const { projectId } = this.context.employee;
    const projectPromise = projectId
      ? ProjectsRepository.getById(projectId)
      : Promise.resolve(null);
    const issuesPromise = IssuesRepository.getAll();
    const employeesPromise = EmployeesRepository.getAll();

    this.props
      .fetching(Promise.all([projectPromise, issuesPromise, employeesPromise]))
      .then(([project, issuesList, employees]) => {
        const activity: IEmployeeActivity[] = employees
          .map((employee) => {
            return employee.activity.map((item) => {
              return {
                ...item,
                employeeName: `${employee.firstName} ${employee.lastName}`,
              };
            });
          })
          .reduce((result, current) => result.concat(current), [])
          .sort((a, b) => {
            const aDate = moment(a.date, DATES_FORMATS.FULL_FORMAT);
            const bDate = moment(b.date, DATES_FORMATS.FULL_FORMAT);

            return aDate < bDate ? 1 : -1;
          });

        if (!projectId) {
          this.setState({ activity });
          return;
        }

        const issues = issuesList.filter((item) => item.projectId === projectId);
        this.setState({ activity, project, issues });
      });
  }

  getIntroduction() {
    return (
      <div className={styles.introduction}>
        <div className={styles.sectionTitle}>
          <ReadOutlined /> Introduction
        </div>
        <Logo showName />
        <p className={styles.text}>
          Welcome to JIRA Clone! Using this app you can create projects, work in issues, discuss
          them.
          <br />
          Source code here:{' '}
          <span>
            <a
              href='https://github.com/BreslavetsAlexander/project-management-system'
              target='_blank'>
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
        dataSource={this.state.issues}
        locale={{ emptyText: 'No assigned issues' }}
        renderItem={(item) => (
          <List.Item className={styles.listItem}>
            <Link to={ROUTES.PROJECTS.ISSUE.ROUTE(item.projectId, item.id)}>
              {`[${this.state.project?.title}] - ${item.title}`}
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
        dataSource={this.state.activity}
        locale={{ emptyText: 'Empty activity stream' }}
        renderItem={(item) => {
          const title = (
            <>
              {`${item.employeeName} ${item.text} `}
              <Link to={item.link}>{item.type}</Link>
            </>
          );
          const description = (
            <>
              <ClockCircleOutlined />
              {item.date}
            </>
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
