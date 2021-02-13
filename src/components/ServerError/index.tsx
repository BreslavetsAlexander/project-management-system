import React from 'react';
import { Result } from 'antd';
import { ResultProps } from 'antd/lib/result';
import { MESSAGES } from '../../constants/messages';
import styles from './styles.module.scss';

export const ServerError: React.FC<Pick<ResultProps, 'extra'>> = (props) => {
  return (
    <div className={styles.errorWrapper}>
      <Result
        className={styles.error}
        status='500'
        title='Error loading data'
        subTitle={MESSAGES.SOMETHING_WENT_WRONG}
        extra={props.extra}
      />
    </div>
  );
};
