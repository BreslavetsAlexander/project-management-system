import { RouteComponentProps } from 'react-router-dom';
import { IIssue, IEmployee } from '../../definitions';
import { IWithLoaderProps } from '../../components/hoc';

interface IParams {
  projectId: string;
  issueId: string;
}

export interface IState {
  issue: IIssue | null;
  employees: IEmployee[];
  editVisible: boolean;
  logWorkVisible: boolean;
}

export type IProps = RouteComponentProps<IParams> & IWithLoaderProps;
