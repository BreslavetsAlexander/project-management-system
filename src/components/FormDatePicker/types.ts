import { Moment } from 'moment';

export interface IProps {
  label: string;
  name: string;
  message?: string;
  className?: string;
  disabledDate?: (date: Moment) => boolean;
}
