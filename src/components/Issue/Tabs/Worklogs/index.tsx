import React from 'react';
import moment from 'moment';
import { List, Button } from 'antd';
import { DATES_FORMATS } from '../../../../constants/datesFormats';
import { IProps } from './types';
import styles from './styles.module.scss';

export class Worklogs extends React.Component<IProps> {
  getWorklogTime(time: string) {
    const momentTime = moment(time, DATES_FORMATS.HOURS_MINUTES);
    const hours = momentTime.get('hours');
    const minutes = momentTime.get('minutes');

    if (!hours) {
      return `${minutes}m`;
    }

    if (!minutes) {
      return `${hours}h`;
    }

    return `${hours}h ${minutes}m`;
  }

  getTotalTime() {
    if (!this.props.worklogs.length) {
      return null;
    }

    const minutesSum = this.props.worklogs.reduce((m, worklog) => {
      return m + moment(worklog.time, DATES_FORMATS.HOURS_MINUTES).get('minutes');
    }, 0);
    const hoursSum =
      this.props.worklogs.reduce((h, worklog) => {
        return h + moment(worklog.time, DATES_FORMATS.HOURS_MINUTES).get('hours');
      }, 0) + Math.trunc(minutesSum / 60);

    const days = Math.trunc(hoursSum / 24);
    const hours = hoursSum % 24;
    const minutes = minutesSum % 60;

    let result = '';

    if (days) {
      result += `${days}d`;
    }

    if (hours) {
      result += ` ${hours}h`;
    }

    if (minutes) {
      result += ` ${minutes}m`;
    }

    return <div>Total worklog time: {result}</div>;
  }

  render() {
    return (
      <List
        className={styles.list}
        itemLayout='horizontal'
        dataSource={this.props.worklogs}
        renderItem={(item) => {
          const actions = [
            <Button type='primary' danger onClick={() => this.props.deleteWorkLog(item.id)}>
              Delete
            </Button>,
          ];

          return (
            <List.Item className={styles.listItem} actions={actions}>
              <List.Item.Meta title={item.employee.name} description={item.date} />
              <div>{this.getWorklogTime(item.time)}</div>
            </List.Item>
          );
        }}
        footer={this.getTotalTime()}
      />
    );
  }
}
