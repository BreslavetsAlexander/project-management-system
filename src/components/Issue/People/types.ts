import { IEmployee, IIssue } from './../../../definitions/index';

export interface IProps {
  employees: IEmployee[];
  author: IIssue['author'];
  assignee: IIssue['assignee'];
  onChangeAssignee: (assignee: Pick<IEmployee, 'id' | 'name'>) => void;
}

export interface IFormValues {
  assigneeId: number;
}
