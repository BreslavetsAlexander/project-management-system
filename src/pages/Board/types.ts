import { RouteComponentProps } from 'react-router-dom';
import { IEmployee, IIssue, IProject } from './../../definitions/index';

interface IEmployeeWithIssues extends IEmployee {
  issues: IIssue[];
}

interface IParams {
  id: string;
}

export interface IProjectWithEmployees extends IProject {
  employees: IEmployeeWithIssues[];
}

export type IProps = RouteComponentProps<IParams>;

export interface IState {
  project: IProjectWithEmployees | null;
}
