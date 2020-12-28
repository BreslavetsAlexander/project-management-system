import React from 'react';
import { Form, Button } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { FormInput } from '../FormInput';
import { INPUT_NAMES } from './constants';
import { IProps, IState, IFormValues } from './types';
import styles from './styles.module.scss';

export class ProfileForm extends React.Component<IProps, IState> {
  state: IState = {
    isButtonDisabled: true,
  };

  getFormRef = () => React.createRef<FormInstance<IFormValues>>();

  formRef = this.getFormRef();

  componentDidMount() {
    this.formRef = this.getFormRef();
  }

  setIsButtonDisabled = (isButtonDisabled: boolean) => {
    this.setState({ isButtonDisabled });
  };

  getInitialValues() {
    return {
      [INPUT_NAMES.FIRST_NAME.name]: this.props.employee.firstName,
      [INPUT_NAMES.LAST_NAME.name]: this.props.employee.lastName,
      [INPUT_NAMES.EMAIL.name]: this.props.employee.email,
      [INPUT_NAMES.PASSWORD.name]: this.props.employee.password,
      [INPUT_NAMES.USERNAME.name]: this.props.employee.username,
    };
  }

  onSubmit = (values: IFormValues) => {
    console.log(values);
    this.setIsButtonDisabled(true);
  };

  onValuesChange = () => {
    const currentValues = JSON.stringify(this.formRef.current?.getFieldsValue());
    const initialValues = JSON.stringify(this.getInitialValues());

    this.setIsButtonDisabled(currentValues === initialValues);
  };

  onReset = () => {
    this.formRef.current?.resetFields();

    this.setIsButtonDisabled(true);
  };

  render() {
    return (
      <Form<IFormValues>
        ref={this.formRef}
        className={styles.form}
        layout='vertical'
        onFinish={this.onSubmit}
        onValuesChange={this.onValuesChange}
        initialValues={this.getInitialValues()}>
        {Object.values(INPUT_NAMES).map((item) => (
          <FormInput key={item.name} label={item.label} name={item.name} />
        ))}
        <div className={styles.buttons}>
          <Button
            type='primary'
            danger
            disabled={this.state.isButtonDisabled}
            onClick={this.onReset}>
            Reset
          </Button>
          <Form.Item>
            <Button type='primary' htmlType='submit' disabled={this.state.isButtonDisabled}>
              Save
            </Button>
          </Form.Item>
        </div>
      </Form>
    );
  }
}
