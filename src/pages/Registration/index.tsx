import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Typography } from 'antd';
import { FormInput } from '../../components/FormInput';
import { IWithLoaderProps, withLoader } from '../../components/hoc';
import { ROUTES } from '../../constants/routes';
import styles from './styles.module.scss';

class _Registration extends React.Component<IWithLoaderProps> {
  render() {
    return (
      <div className={styles.registration}>
        <div className={styles.formWrapper}>
          <Typography.Title>Registration</Typography.Title>
          <Form>
            <FormInput placeholder='First name' name='firstName' />
            <FormInput placeholder='Last name' name='lastName' />
            <FormInput placeholder='username' name='username' />
            <FormInput placeholder='email' name='name' />
            <FormInput type='password' placeholder='password' name='password' />
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
