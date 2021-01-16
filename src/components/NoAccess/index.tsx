import React from 'react';
import { Result } from 'antd';
import { Props } from './types';
import styles from './styles.module.scss';

export const NoAccess: React.FC<Props> = (props) => {
  return (
    <div className={styles.resultWrapper}>
      <Result
        className={styles.result}
        status='403'
        title={props.title}
        subTitle={props.subTitle}
        extra={props.extra}
      />
    </div>
  );
};
