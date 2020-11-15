import { RouteComponentProps } from 'react-router-dom';
import { IEmployee, IIssue, IProject } from './../../definitions/index';

interface IParams {
  id: string;
}

export type IProps = RouteComponentProps<IParams>;

interface IEmployeeWithIssues extends IEmployee {
  issues: IIssue[];
}

export interface IState {
  project: IProject | null;
  projectEmployees: IEmployeeWithIssues[] | null;
  editVisible: boolean;
}
