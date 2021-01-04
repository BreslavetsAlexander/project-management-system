import React from 'react';
import { withRouter, Redirect, Link, RouteComponentProps } from 'react-router-dom';
import { Form, Button, Typography } from 'antd';
import { FormInput } from '../../components/FormInput';
import { IWithLoaderProps, withLoader } from '../../components/hoc';
import { INPUT_NAMES } from '../../components/ProfileForm/constants';
import { IFormValues } from '../../components/ProfileForm/types';
import { ROUTES } from '../../constants/routes';
import { EmployeeContext } from '../../context';
import { AuthService } from '../../services/Auth';
import { EmployeesRepository } from '../../services/repositories';
import styles from './styles.module.scss';

class _Registration extends React.Component<IWithLoaderProps & RouteComponentProps> {
  static contextType = EmployeeContext;
  context!: React.ContextType<typeof EmployeeContext>;

  getEmployee = async (values: IFormValues) => {
    const authRes = await AuthService.register({
      email: values.email,
      password: values.password,
    });
    const employee = await EmployeesRepository.update(authRes.localId, {
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      username: values.username,
      idToken: authRes.idToken,
    });

    return {
      ...employee,
      id: authRes.localId,
      projectId: null,
    };
  };

  onSubmit = (values: IFormValues) => {
    this.props.fetching(this.getEmployee(values)).then((res) => {
      this.context.setEmployee(res);
      this.props.history.push(ROUTES.HOME);
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

export const Registration = withRouter(withLoader(_Registration));
