import { IEmployee } from '../../definitions';

export interface IProps {
  employee: IEmployee;
}

export interface IState {
  isButtonDisabled: boolean;
}

export type IFormValues = Pick<
  IEmployee,
  'firstName' | 'lastName' | 'email' | 'password' | 'username'
>;
