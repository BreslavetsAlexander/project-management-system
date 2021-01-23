import { IProject, IActivity, IIssue } from '../../definitions';

export type IEmployeeActivity = IActivity & {
  employeeName: string;
};

export interface IState {
  project: IProject | null;
  activity: IEmployeeActivity[];
  issues: IIssue[];
}
