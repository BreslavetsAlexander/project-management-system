import React from 'react';
import { Form, Input } from 'antd';
import { IProps } from './types';
import styles from './styles.module.scss';

export const FormTextArea: React.FC<IProps> = (props) => {
  const rules = [{ required: true, message: props.message || 'Field is required' }];

  return (
    <Form.Item className={styles.formItem} label={props.label} name={props.name} rules={rules}>
      <Input.TextArea rows={props.rows || 3} />
    </Form.Item>
  );
};
