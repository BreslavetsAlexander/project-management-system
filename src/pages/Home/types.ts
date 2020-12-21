import { IIssue, IActivity } from '../../definitions';

export interface IState {
  issues: IIssue[];
  activity: IActivity[];
}
