import { RouteComponentProps } from 'react-router-dom';
import { IWithLoaderProps } from '../../components/hoc';
import { IEmployee, IProject, IIssue } from './../../definitions';

interface IParams {
  id: string;
}

export type IProps = RouteComponentProps<IParams> & IWithLoaderProps;

export interface IState {
  project: IProject | null;
  employees: IEmployee[];
  projectEmployees: IEmployee[];
  projectIssues: IIssue[];
  projectModalVisible: boolean;
  issueModalVisible: boolean;
}

export interface IFormValues {
  employeeId: IEmployee['id'];
}
