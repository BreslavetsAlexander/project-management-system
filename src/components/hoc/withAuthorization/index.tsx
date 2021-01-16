import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { NoAccess } from './../../../components/NoAccess';
import { ROUTES } from './../../../constants/routes';
import { EmployeeContext } from './../../../context';

export const withAuthorization = <TProps extends {}>(Component: React.ComponentType<TProps>) => {
  return class extends React.Component {
    static contextType = EmployeeContext;
    context!: React.ContextType<typeof EmployeeContext>;

    render() {
      if (this.context.employee) {
        return <Component {...(this.props as TProps)} />;
      }

      return (
        <NoAccess
          title='403'
          subTitle='Sorry, you are not authorized to access this page'
          extra={
            <Button type='primary'>
              <Link to={ROUTES.LOG_IN}>Log in</Link>
            </Button>
          }
        />
      );
    }
  };
};
