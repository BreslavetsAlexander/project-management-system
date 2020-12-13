import { RouteComponentProps } from 'react-router-dom';
import { IWithLoaderProps } from '../../components/hoc';
import { IEmployee, IIssue, IProject } from './../../definitions/index';

interface IParams {
  id: string;
}

export type IProps = RouteComponentProps<IParams> & IWithLoaderProps;

interface IEmployeeWithIssues extends IEmployee {
  issues: IIssue[];
}

export interface IState {
  project: IProject | null;
  projectEmployees: IEmployeeWithIssues[];
  projectModalVisible: boolean;
  issueModalVisible: boolean;
}
