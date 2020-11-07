import React from 'react';
import { Typography, Steps } from 'antd';
import { ISSUES } from '../../../constants/issues';
import { IProps } from './types';
import styles from './styles.module.scss';

export const IssueStatus: React.FC<IProps> = (props) => {
  const statuses = Object.values(ISSUES.STATUSES);
  const current = statuses.findIndex((status) => status === props.issueStatus);

  return (
    <div className={styles.status}>
      <Typography.Title level={3}>Status</Typography.Title>
      <Steps current={current} className={styles.steps} onChange={props.onChange}>
        {statuses.map((status) => (
          <Steps.Step key={status} title={status} />
        ))}
      </Steps>
    </div>
  );
};
