import React from 'react';
import { Select as SelectAntd } from 'antd';
import { IProps } from './types';

export const Select: React.FC<IProps> = (props) => {
  return (
    <SelectAntd
      onChange={props.onChange}
      className={props.className}
      placeholder={props.placeholder || 'select'}
      defaultValue={props.defaultValue}>
      {props.options.map((item) => (
        <SelectAntd.Option key={item.value} value={item.value}>
          {item.title}
        </SelectAntd.Option>
      ))}
    </SelectAntd>
  );
};
