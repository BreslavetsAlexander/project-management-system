import React from 'react';
import { Form, Select } from 'antd';
import { IProps } from './types';
import styles from './styles.module.scss';

export const FormSelect: React.FC<IProps> = (props) => {
  const rules = [{ required: true, message: props.message || 'Field is required' }];

  return (
    <Form.Item className={styles.formItem} label={props.label} name={props.name} rules={rules}>
      <Select placeholder={props.message || 'Select option'} notFoundContent={props.empty}>
        {props.options.map((option) => (
          <Select.Option key={option.value} value={option.value}>
            {option.title}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};
