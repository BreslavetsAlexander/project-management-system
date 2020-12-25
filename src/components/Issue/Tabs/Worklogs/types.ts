import { IWorkLog } from '../../../../definitions';

export interface IProps {
  worklogs: IWorkLog[];
  deleteWorkLog: (id: IWorkLog['id']) => void;
}
