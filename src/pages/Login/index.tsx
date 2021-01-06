import React from 'react';
import { withRouter, Redirect, Link, RouteComponentProps } from 'react-router-dom';
import { Form, Button, Typography, message } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { EmailInput } from '../../components/EmailInput';
import { PasswordInput } from '../../components/PasswordInput';
import { IWithLoaderProps, withLoader } from '../../components/hoc';
import { ROUTES } from '../../constants/routes';
import { MESSAGES } from '../../constants/messages';
import { IFormValues } from '../../components/ProfileForm/types';
import { INPUT_NAMES } from '../../components/ProfileForm/constants';
import { EmployeeContext } from '../../context';
import { EmployeesRepository } from '../../services/repositories';
import { AuthService, IResponse, IError } from '../../services/Auth';
import styles from './styles.module.scss';

class _Login extends React.Component<IWithLoaderProps & RouteComponentProps> {
  static contextType = EmployeeContext;
  context!: React.ContextType<typeof EmployeeContext>;

  getEmployee = async (email: string, password: string) => {
    const authRes = await AuthService.logIn({
      email,
      password,
    });

    if (
      [MESSAGES.AUTH.EMAIL_NOT_FOUND, MESSAGES.AUTH.INVALID_PASSWORD].includes(
        (authRes as IError).error?.message,
      )
    ) {
      message.error(MESSAGES.CHECK_DATA);
      return null;
    }

    const { localId } = authRes as IResponse;

    const employee = await EmployeesRepository.getById(localId);

    return {
      ...employee,
      id: localId,
    };
  };

  onSubmit = (values: IFormValues) => {
    this.props.fetching(this.getEmployee(values.email, values.password)).then((res) => {
      if (!res) {
        return;
      }

      this.context.setEmployee(res);
      this.props.history.push(ROUTES.HOME);
    });
  };

  render() {
    if (this.context.employee) {
      return <Redirect to={ROUTES.HOME} />;
    }

    return (
      <div className={styles.login}>
        <div className={styles.formWrapper}>
          <Typography.Title>
            <LoginOutlined /> Log In
          </Typography.Title>
          <Form<IFormValues> onFinish={this.onSubmit}>
            <EmailInput placeholder={INPUT_NAMES.EMAIL.label} name={INPUT_NAMES.EMAIL.name} />
            <PasswordInput
              placeholder={INPUT_NAMES.PASSWORD.label}
              name={INPUT_NAMES.PASSWORD.name}
            />
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

export const Login = withRouter(withLoader(_Login));
