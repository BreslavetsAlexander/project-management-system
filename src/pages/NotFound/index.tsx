import React from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';
import { ROUTES } from '../../constants/routes';
import styles from './styles.module.scss';

export const NotFound: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Result
        className={styles.notFound}
        status='404'
        title='404'
        subTitle='Sorry, the page you visited does not exist'
        extra={
          <Button type='primary'>
            <Link to={ROUTES.HOME}>Back Home</Link>
          </Button>
        }
      />
    </div>
  );
};
