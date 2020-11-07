import React from 'react';
import { Form, AutoComplete } from 'antd';
import { IProps } from './types';

export const FormAutoComplete: React.FC<IProps> = (props) => {
  const rules = [{ required: true, message: props.message || 'Field is required' }];

  return (
    <Form.Item label={props.label} name={props.name} rules={rules}>
      <AutoComplete options={props.options} />
    </Form.Item>
  );
};
