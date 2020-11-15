import { IProject, IIssue } from '../../definitions';

interface IProjectWithIssue extends IProject {
  issues: IIssue[];
}

export interface IState {
  projects: IProjectWithIssue[] | [];
  visible: boolean;
}
