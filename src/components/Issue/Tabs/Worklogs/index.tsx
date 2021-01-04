import React from 'react';
import { List, Button, Typography, Progress, Row, Col } from 'antd';
import { blue, orange, green } from '@ant-design/colors';
import { convertTimeObjectToMinutes, getTimeAsString, convertMinutesToTimeObject } from './utils';
import { IProps } from './types';
import styles from './styles.module.scss';

export class Worklogs extends React.Component<IProps> {
  getOriginalEstimateMinutes = () => convertTimeObjectToMinutes(this.props.originalEstimate);

  getRemainingEstimateMinutes = () => convertTimeObjectToMinutes(this.getRemainingEstimate());

  getLoggedMinutes = () => convertTimeObjectToMinutes(this.getLoggedTime());

  getRemainingEstimate() {
    const originalEstimateMinutes = this.getOriginalEstimateMinutes();
    const loggedMinutes = this.getLoggedMinutes();

    return convertMinutesToTimeObject(originalEstimateMinutes - loggedMinutes);
  }

  getLoggedTime() {
    const minutes = this.props.worklogs.reduce((sum, worklog) => {
      return sum + convertTimeObjectToMinutes(worklog.time);
    }, 0);

    return convertMinutesToTimeObject(minutes);
  }

  getLoggedPercent = () => (this.getLoggedMinutes() / this.getOriginalEstimateMinutes()) * 100;

  render() {
    const originalEstimate = getTimeAsString(this.props.originalEstimate);
    const logged = getTimeAsString(this.getLoggedTime());
    const remainingEstimate = getTimeAsString(this.getRemainingEstimate());

    return (
      <Row gutter={[24, 0]}>
        <Col sm={8}>
          <Typography.Title level={4}>Time tracking</Typography.Title>
          <div>
            <div>Original Estimate: {originalEstimate}</div>
            <Progress percent={100} format={() => null} strokeColor={blue.primary} />
          </div>
          <div>
            <div>Remaining Estimate: {remainingEstimate}</div>
            <Progress
              className={styles.remainingEstimateProgress}
              percent={100 - this.getLoggedPercent()}
              format={() => null}
              strokeColor={orange.primary}
            />
          </div>
          <div>
            <div>Logged: {logged}</div>
            <Progress
              percent={this.getLoggedPercent()}
              format={() => null}
              strokeColor={green.primary}
            />
          </div>
        </Col>
        <Col sm={16}>
          <List
            className={styles.list}
            itemLayout='horizontal'
            dataSource={this.props.worklogs}
            header={<Typography.Title level={4}>Worklogs</Typography.Title>}
            renderItem={(item) => {
              const actions = [
                <Button type='primary' danger onClick={() => this.props.deleteWorkLog(item.id)}>
                  Delete
                </Button>,
              ];

              const isAuthor = this.props.employee?.id === item.employee.id;

              return (
                <List.Item className={styles.listItem} actions={isAuthor ? actions : []}>
                  <List.Item.Meta
                    title={`${item.employee.firstName} ${item.employee.lastName}`}
                    description={item.date}
                  />
                  <div>{getTimeAsString(item.time)}</div>
                </List.Item>
              );
            }}
          />
        </Col>
      </Row>
    );
  }
}
