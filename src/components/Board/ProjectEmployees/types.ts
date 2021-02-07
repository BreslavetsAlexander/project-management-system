import { IEmployee, IProject, IIssue } from '../../../definitions';

export interface IProps {
  employees: IEmployee[];
  issues: IIssue[];
  currentEmployeeId: IEmployee['id'];
  projectAuthorId: IProject['authorId'];
  onLeaveProject: (id: IEmployee['id']) => void;
}
