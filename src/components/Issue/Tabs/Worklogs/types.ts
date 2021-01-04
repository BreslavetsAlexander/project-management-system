import { IEmployee, IWorkLog, IIssue } from '../../../../definitions';

export interface IProps {
  employee: IEmployee | null;
  originalEstimate: IIssue['originalEstimate'];
  worklogs: IWorkLog[];
  deleteWorkLog: (id: IWorkLog['id']) => void;
}
