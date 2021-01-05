import React from 'react';
import { Rule } from 'antd/lib/form';
import { FormInput } from '../FormInput';
import { IProps } from '../FormInput/types';

export const EmailInput: React.FC<IProps> = (props) => {
  const rules: Rule[] = [
    {
      type: 'email',
      message: 'This is not valid email',
      required: true,
    },
  ];

  return (
    <FormInput
      placeholder={props.placeholder}
      name={props.name}
      label={props.label}
      rules={rules}
    />
  );
};
