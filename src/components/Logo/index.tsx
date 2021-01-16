import React from 'react';
import { Typography } from 'antd';
import classnames from 'classnames';
import { HeatMapOutlined } from '@ant-design/icons';
import { IProps } from './types';
import styles from './styles.module.scss';

export const Logo: React.FC<IProps> = (props) => {
  const showName = props.showName || false;

  return (
    <div className={styles.logo}>
      <HeatMapOutlined
        className={classnames(styles.icon, {
          [styles.light]: props.light,
        })}
      />
      {showName && <Typography.Title level={5}>JIRA Clone</Typography.Title>}
    </div>
  );
};
