import React from 'react';
import { Form } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { FormInput } from '../FormInput';
import { EmailInput } from '../EmailInput';
import { PasswordInput } from '../PasswordInput';
import { INPUT_NAMES } from './constants';
import { IProps, IFormValues } from './types';
import styles from './styles.module.scss';

export class ProfileForm extends React.Component<IProps> {
  formRef = React.createRef<FormInstance<IFormValues>>();

  getInitialValues() {
    return {
      [INPUT_NAMES.FIRST_NAME.name]: this.props.employee.firstName,
      [INPUT_NAMES.LAST_NAME.name]: this.props.employee.lastName,
      [INPUT_NAMES.EMAIL.name]: this.props.employee.email,
      [INPUT_NAMES.PASSWORD.name]: this.props.employee.password,
      [INPUT_NAMES.USERNAME.name]: this.props.employee.username,
    };
  }

  onValuesChange = (name: keyof IFormValues) => {
    const values = this.formRef.current?.getFieldsValue();

    if (!values) {
      return;
    }

    if (values[name] === this.props.employee[name]) {
      return;
    }

    this.props.saveInfo(name, values[name]);
  };

  render() {
    return (
      <Form<IFormValues>
        ref={this.formRef}
        className={styles.form}
        layout='vertical'
        onBlur={(e) => this.onValuesChange(e.target.id as keyof IFormValues)}
        initialValues={this.getInitialValues()}>
        <FormInput
          label={INPUT_NAMES.FIRST_NAME.label}
          placeholder={INPUT_NAMES.FIRST_NAME.label}
          name={INPUT_NAMES.FIRST_NAME.name}
        />
        <FormInput
          label={INPUT_NAMES.LAST_NAME.label}
          placeholder={INPUT_NAMES.LAST_NAME.label}
          name={INPUT_NAMES.LAST_NAME.name}
        />
        <EmailInput
          placeholder={INPUT_NAMES.EMAIL.label}
          name={INPUT_NAMES.EMAIL.name}
          label={INPUT_NAMES.EMAIL.label}
        />
        <FormInput
          label={INPUT_NAMES.USERNAME.label}
          placeholder={INPUT_NAMES.USERNAME.label}
          name={INPUT_NAMES.USERNAME.name}
        />
        <PasswordInput
          placeholder={INPUT_NAMES.PASSWORD.label}
          name={INPUT_NAMES.PASSWORD.name}
          label={INPUT_NAMES.PASSWORD.label}
        />
      </Form>
    );
  }
}
