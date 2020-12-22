import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Typography } from 'antd';
import { FormInput } from '../../components/FormInput';
import { IWithLoaderProps, withLoader } from '../../components/hoc';
import { ROUTES } from '../../constants/routes';
import styles from './styles.module.scss';

class _Login extends React.Component<IWithLoaderProps> {
  render() {
    return (
      <div className={styles.login}>
        <div className={styles.formWrapper}>
          <Typography.Title>Log In</Typography.Title>
          <Form>
            <FormInput placeholder='email' name='email' />
            <FormInput type='password' placeholder='password' name='password' />
            <Form.Item>
              <Button type='primary' htmlType='submit' block>
                Log in
              </Button>
            </Form.Item>
          </Form>
          <p>
            or <Link to={ROUTES.REGISTRATION}>Register now</Link>
          </p>
        </div>
      </div>
    );
  }
}

export const Login = withLoader(_Login);
