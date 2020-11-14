import { IProject, IIssue } from '../../definitions';

export interface IProjectWithIssue extends IProject {
  issues: IIssue[];
}
