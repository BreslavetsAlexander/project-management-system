import { RouteComponentProps } from 'react-router-dom';
import { Moment } from 'moment';
import { IIssue, IEmployee } from '../../definitions/index';

interface IParams {
  id: string;
}

export interface IState {
  issue: IIssue | null;
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

export type IProps = RouteComponentProps<IParams>;
