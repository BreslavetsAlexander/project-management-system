import { IEmployee } from './../../definitions';

export interface IEmployeeContext {
  employee: IEmployee | null;
  setEmployee: (employee: IEmployee | null) => void;
}

export type IState = Pick<IEmployeeContext, 'employee'>;
