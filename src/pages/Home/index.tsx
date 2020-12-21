import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Result, Typography, List } from 'antd';
import { HeatMapOutlined, UserOutlined } from '@ant-design/icons';
import { IWithLoaderProps, withLoader } from './../../components/hoc';
import { IssuesRepository, ActivityRepository } from './../../services/repositories';
import { ROUTES } from './../../constants/routes';
import { IState } from './types';
import styles from './styles.module.scss';

class _Home extends React.Component<IWithLoaderProps, IState> {
  state: IState = {
    issues: [],
    activity: [],
  };

  componentDidMount() {
    const issuesPromise = IssuesRepository.getAll();
    const activityPromise = ActivityRepository.getAll();
    this.props
      .fetching(Promise.all([issuesPromise, activityPromise]))
      .then(([issues, activity]) => this.setState({ issues, activity }));
  }

  getIntroduction() {
    return (
      <div className={styles.introduction}>
        <div className={styles.sectionTitle}>Introduction</div>
        <Result
          className={styles.result}
          icon={<HeatMapOutlined />}
          title='Welcome to JIRA Clone'
        />
        <p className={styles.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati nemo corporis, animi
          sit architecto molestiae.
        </p>
      </div>
    );
  }

  getAssignedToMe() {
    return (
      <div className={styles.assignedToMe}>
        <div className={styles.sectionTitle}>Assigned to Me</div>
        <List
          size='large'
          dataSource={this.state.issues}
          renderItem={(item) => (
            <List.Item className={styles.listItem}>
              <Link to={ROUTES.ISSUES.DETAIL.ROUTE(item.id)}>{item.title}</Link>
              <div>{item.status}</div>
            </List.Item>
          )}
        />
      </div>
    );
  }

  getActivityStream() {
    return (
      <div className={styles.activityStream}>
        <div className={styles.sectionTitle}>Activity Stream</div>
        <List
          className={styles.list}
          itemLayout='horizontal'
          dataSource={this.state.activity.reverse()}
          renderItem={(item) => {
            const issueRoute = ROUTES.ISSUES.DETAIL.ROUTE(item.entity.id);
            const projectRoute = ROUTES.PROJECTS.DETAIL.ROUTE(item.entity.id);
            const to = item.type === 'issue' ? issueRoute : projectRoute;
            const link = <Link to={to}>{item.entity.name}</Link>;
            const title = (
              <p>
                {`${item.employee.name} ${item.text} ${item.type} `}
                {link}
              </p>
            );

            return (
              <List.Item className={styles.listItem}>
                <List.Item.Meta
                  avatar={<UserOutlined className={styles.userIcon} />}
                  title={title}
                  description={item.date}
                />
              </List.Item>
            );
          }}
        />
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
