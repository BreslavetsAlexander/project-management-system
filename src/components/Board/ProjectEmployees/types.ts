import { IEmployee, IProject } from '../../../definitions';

export interface IProps {
  employees: IEmployee[];
  project: IProject;
  currentEmployeeId: IEmployee['id'];
  onLeaveProject: (id: IEmployee['id']) => void;
}
