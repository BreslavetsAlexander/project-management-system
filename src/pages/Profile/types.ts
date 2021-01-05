import { RouteComponentProps } from 'react-router-dom';
import { IWithLoaderProps } from '../../components/hoc';
import { IProject } from '../../definitions';

export type Props = IWithLoaderProps & RouteComponentProps;

export interface IState {
  project: IProject | null;
}
