import { IEmployee, IIssue } from '../../../definitions';

export interface IProps {
  employees: IEmployee[];
  issues: IIssue[];
  currentEmployeeId: IEmployee['id'];
  onLeaveProject: (id: IEmployee['id']) => void;
}
