import React from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';
import { ROUTES } from './../../../constants/routes';
import { EmployeeContext } from './../../../context';
import styles from './styles.module.scss';

export const withAuthorization = <TProps extends {}>(Component: React.ComponentType<TProps>) => {
  return class extends React.Component {
    static contextType = EmployeeContext;
    context!: React.ContextType<typeof EmployeeContext>;

    getNotAuthorizedContent() {
      return (
        <div className={styles.resultWrapper}>
          <Result
            className={styles.result}
            status='403'
            title='403'
            subTitle='Sorry, you are not authorized to access this page'
            extra={
              <Button type='primary'>
                <Link to={ROUTES.LOG_IN}>Log in</Link>
              </Button>
            }
          />
        </div>
      );
    }

    getComponent() {
      return <Component {...(this.props as TProps)} />;
    }

    render() {
      return this.context.employee ? this.getComponent() : this.getNotAuthorizedContent();
    }
  };
};
