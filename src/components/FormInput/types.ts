import { Rule } from 'antd/lib/form';

export interface IProps {
  name: string;
  message?: string;
  label?: string;
  placeholder?: string;
  type?: 'password' | 'text';
  rules?: Rule[];
}
