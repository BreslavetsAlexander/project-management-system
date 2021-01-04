import { IProject, IActivity } from '../../definitions';

export interface IState {
  project: IProject | null;
  activity: IActivity[];
}
