import { RouteComponentProps } from 'react-router-dom';
import { IIssue, IEmployee, IComment, IWorkLog } from '../../definitions';
import { IWithLoaderProps } from '../../components/hoc';

interface IParams {
  id: string;
}

export interface IState {
  issue: IIssue | null;
  comments: IComment[];
  worklogs: IWorkLog[];
  employees: IEmployee[];
  editVisible: boolean;
  logWorkVisible: boolean;
}

export type IProps = RouteComponentProps<IParams> & IWithLoaderProps;
