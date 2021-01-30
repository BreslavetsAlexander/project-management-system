import { RouteComponentProps } from 'react-router-dom';
import { IWithLoaderProps } from '../../components/hoc';
import { IEmployee } from '../../definitions';

export type Props = IWithLoaderProps & RouteComponentProps;

export type IFormValues = Pick<IEmployee, 'email' | 'password'>;
