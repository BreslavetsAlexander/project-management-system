import React from 'react';
import { Form, Input } from 'antd';
import { IProps } from './types';

export const FormInput: React.FC<IProps> = (props) => {
  const rules = [{ required: true, message: props.message || 'Field is required' }];
  const passwordInput = <Input.Password placeholder={props.placeholder} />;
  const simpleInput = <Input placeholder={props.placeholder} />;
  const input = props.type === 'password' ? passwordInput : simpleInput;

  return (
    <Form.Item label={props.label} name={props.name} rules={rules}>
      {input}
    </Form.Item>
  );
};
