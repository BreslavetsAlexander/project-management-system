import { RouteComponentProps } from 'react-router-dom';
import { IWithLoaderProps } from '../../components/hoc';
import { IEmployee, IProject } from './../../definitions';

interface IParams {
  id: string;
}

export type IProps = RouteComponentProps<IParams> & IWithLoaderProps;

export interface IState {
  project: IProject | null;
  employees: IEmployee[];
  projectEmployees: IEmployee[];
  projectModalVisible: boolean;
  issueModalVisible: boolean;
}

export interface IFormValues {
  employeeId: IEmployee['id'];
}
