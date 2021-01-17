import React from 'react';
import { Typography } from 'antd';
import { HeatMapOutlined } from '@ant-design/icons';
import { IProps } from './types';
import styles from './styles.module.scss';

export const Logo: React.FC<IProps> = (props) => {
  const showName = props.showName || false;
  const classNames = [styles.icon];

  if (props.light) {
    classNames.push(styles.light);
  }

  return (
    <div className={styles.logo}>
      <HeatMapOutlined className={classNames.join(' ')} />
      {showName && <Typography.Title level={5}>JIRA Clone</Typography.Title>}
    </div>
  );
};
