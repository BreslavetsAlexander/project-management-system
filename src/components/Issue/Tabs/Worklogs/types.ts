import { IWorkLog, IIssue } from '../../../../definitions';

export interface IProps {
  originalEstimate: IIssue['originalEstimate'];
  worklogs: IWorkLog[];
  deleteWorkLog: (id: IWorkLog['id']) => void;
}
