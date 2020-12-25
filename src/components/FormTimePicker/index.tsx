import React from 'react';
import { Form, TimePicker } from 'antd';
import { DATES_FORMATS } from '../../constants/datesFormats';
import { IProps } from './types';

export const FormTimePicker: React.FC<IProps> = (props) => {
  const rules = [{ required: true, message: props.message || 'Field is required' }];

  return (
    <Form.Item label={props.label} name={props.name} rules={rules}>
      <TimePicker
        format={DATES_FORMATS.HOURS_MINUTES}
        showNow={false}
        placeholder={props.placeholder}
        disabledHours={() => [0]}
        disabledMinutes={() => [0]}
      />
    </Form.Item>
  );
};
