import React from 'react';
import { Rule } from 'antd/lib/form';
import { FormInput } from '../FormInput';
import { IProps } from '../FormInput/types';

export const PasswordInput: React.FC<IProps> = (props) => {
  const rules: Rule[] = [
    {
      message: 'Minimum password length 10 characters',
      required: true,
      min: 10,
    },
  ];

  return (
    <FormInput
      placeholder={props.placeholder}
      name={props.name}
      label={props.label}
      rules={rules}
      type='password'
    />
  );
};
