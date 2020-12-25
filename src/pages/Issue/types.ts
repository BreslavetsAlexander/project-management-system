import { RouteComponentProps } from 'react-router-dom';
import { Moment } from 'moment';
import { IWithLoaderProps } from '../../components/hoc';
import { IIssue, IEmployee, IComment, IWorkLog } from '../../definitions/index';

interface IParams {
  id: string;
}

export interface IState {
  issue: IIssue | null;
  comments: IComment[];
  worklogs: IWorkLog[];
  employees: IEmployee[] | null;
  editVisible: boolean;
  logWorkVisible: boolean;
}

export interface IFormEditValues {
  title: IIssue['title'];
  description: IIssue['description'];
  priority: IIssue['priority'];
}

export interface IFormLogWorkValues {
  date: Moment;
  time: Moment;
}

export type IProps = RouteComponentProps<IParams> & IWithLoaderProps;
