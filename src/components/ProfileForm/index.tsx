import React from 'react';
import { Form } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { FormInput } from '../FormInput';
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
        {Object.values(INPUT_NAMES).map((item) => (
          <FormInput key={item.name} label={item.label} name={item.name} />
        ))}
      </Form>
    );
  }
}
