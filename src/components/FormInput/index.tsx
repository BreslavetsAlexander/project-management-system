import React from 'react';
import { Form, Input } from 'antd';
import { IProps } from './types';
import styles from './styles.module.scss';

export const FormInput: React.FC<IProps> = (props) => {
  const propsRules = props.rules ? props.rules : [];
  const rules = [{ required: true, message: props.message || 'Field is required' }, ...propsRules];
  const passwordInput = <Input.Password placeholder={props.placeholder} />;
  const simpleInput = <Input placeholder={props.placeholder} />;
  const input = props.type === 'password' ? passwordInput : simpleInput;

  return (
    <Form.Item className={styles.formItem} label={props.label} name={props.name} rules={rules}>
      {input}
    </Form.Item>
  );
};
