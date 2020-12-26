import { Moment } from 'moment';
import { IWorkLog } from '../../../definitions';

export interface IProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onSubmit: (values: Pick<IWorkLog, 'date' | 'time'>) => void;
}

export interface IFormValues {
  date: Moment;
  time: Moment;
}
