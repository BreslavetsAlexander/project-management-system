import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Form, Button, Typography } from 'antd';
import { FormInput } from '../../components/FormInput';
import { IWithLoaderProps, withLoader } from '../../components/hoc';
import { INPUT_NAMES } from '../../components/ProfileForm/constants';
import { IFormValues } from '../../components/ProfileForm/types';
import { ROUTES } from '../../constants/routes';
import { EmployeeContext } from '../../context';
import styles from './styles.module.scss';

class _Registration extends React.Component<IWithLoaderProps> {
  static contextType = EmployeeContext;
  context!: React.ContextType<typeof EmployeeContext>;

  onSubmit = (values: IFormValues) => {
    this.context.setEmployee({
      ...values,
      id: 123,
      currentProjectId: 123,
    });
  };

  render() {
    if (this.context.employee) {
      return <Redirect to={ROUTES.HOME} />;
    }

    return (
      <div className={styles.registration}>
        <div className={styles.formWrapper}>
          <Typography.Title>Registration</Typography.Title>
          <Form<IFormValues> onFinish={this.onSubmit}>
            <FormInput
              placeholder={INPUT_NAMES.FIRST_NAME.label}
              name={INPUT_NAMES.FIRST_NAME.name}
            />
            <FormInput
              placeholder={INPUT_NAMES.LAST_NAME.label}
              name={INPUT_NAMES.LAST_NAME.name}
            />
            <FormInput placeholder={INPUT_NAMES.USERNAME.label} name={INPUT_NAMES.USERNAME.name} />
            <FormInput placeholder={INPUT_NAMES.EMAIL.label} name={INPUT_NAMES.EMAIL.name} />
            <FormInput
              placeholder={INPUT_NAMES.PASSWORD.label}
              name={INPUT_NAMES.PASSWORD.name}
              type='password'
            />
            <Form.Item>
              <Button type='primary' htmlType='submit' block>
                Register
              </Button>
            </Form.Item>
          </Form>
          <p>
            or <Link to={ROUTES.LOG_IN}>Log In</Link>
          </p>
        </div>
      </div>
    );
  }
}

export const Registration = withLoader(_Registration);
