import { IProject } from '../../definitions';

export interface IState {
  projects: IProject[];
  visible: boolean;
}
