import React from 'react';
import { Form, DatePicker } from 'antd';
import { DATES_FORMATS } from '../../constants/datesFormats';
import { IProps } from './types';

export const FormDatePicker: React.FC<IProps> = (props) => {
  const rules = [{ required: true, message: props.message || 'Field is required' }];

  return (
    <Form.Item className={props.className} label={props.label} name={props.name} rules={rules}>
      <DatePicker format={DATES_FORMATS.DAY_MONTH_YEAR} />
    </Form.Item>
  );
};
