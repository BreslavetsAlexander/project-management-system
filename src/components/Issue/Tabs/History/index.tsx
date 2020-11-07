import React from 'react';
import { Timeline } from 'antd';
import { IProps } from './types';
import styles from './styles.module.scss';

export const HistoryTab: React.FC<IProps> = (props) => {
  return (
    <Timeline className={styles.timeLine}>
      {props.history.map((item) => (
        <Timeline.Item className={styles.timeLineItem} key={item}>
          item {item} 2015-09-01
        </Timeline.Item>
      ))}
    </Timeline>
  );
};
