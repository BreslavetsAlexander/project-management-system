import { IEmployee, IIssue } from './../../../definitions/index';

export interface IProps {
  employees: IEmployee[];
  assigneeId: IIssue['assigneeId'];
  authorId: IIssue['authorId'];
  onChangeAssignee: (assigneeId: IIssue['assigneeId']) => void;
}

export interface IFormValues {
  assigneeId: IIssue['assigneeId'];
}
