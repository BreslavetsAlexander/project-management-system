import { IEmployee, IIssue } from './../../../definitions/index';

export interface IProps {
  employees: IEmployee[];
  author: IIssue['author'];
  assignee: IIssue['assignee'];
  onChangeAssignee: (assignee: IIssue['assignee']) => void;
}

export interface IFormValues {
  assigneeId: IIssue['assignee']['id'];
}
