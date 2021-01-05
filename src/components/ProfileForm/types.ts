import { IEmployee } from '../../definitions';

export interface IProps {
  employee: IEmployee;
  saveInfo: (field: string, value: string) => void;
}

export type IFormValues = Omit<IEmployee, 'id' | 'idToken' | 'projectId'>;
