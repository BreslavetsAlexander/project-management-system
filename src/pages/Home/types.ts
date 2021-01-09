import { IProject, IActivity, IIssue } from '../../definitions';

export interface IState {
  project: IProject | null;
  activity: IActivity[];
  issues: IIssue[];
}
