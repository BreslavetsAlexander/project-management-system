import { Moment } from 'moment';
import { IIssue, IWorkLog } from '../../../definitions';

export interface IProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onSubmit: (values: Pick<IWorkLog, 'date' | 'time'>) => void;
  loading: boolean;
  createdAt: IIssue['createdAt'];
}

export interface IFormValues {
  date: Moment;
  time: Moment;
}
