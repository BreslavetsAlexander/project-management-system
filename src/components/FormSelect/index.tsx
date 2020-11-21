import React from 'react';
import { Form, Select } from 'antd';
import { IProps } from './types';

export const FormSelect: React.FC<IProps> = (props) => {
  const rules = [{ required: true, message: props.message || 'Field is required' }];

  return (
    <Form.Item label={props.label} name={props.name} rules={rules}>
      <Select placeholder='Select option'>
        {props.options.map((option) => (
          <Select.Option key={option.value} value={option.value}>
            {option.title}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};
