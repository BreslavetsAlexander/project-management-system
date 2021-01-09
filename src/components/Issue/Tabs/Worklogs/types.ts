import { IEmployee, IWorkLog, IIssue } from '../../../../definitions';

export interface IProps {
  employee: IEmployee | null;
  employees: IEmployee[];
  originalEstimate: IIssue['originalEstimate'];
  worklogs: IWorkLog[];
  deleteWorkLog: (id: IWorkLog['id']) => void;
}
