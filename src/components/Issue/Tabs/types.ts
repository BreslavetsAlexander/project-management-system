import { IEmployee, IIssue, IComment, IWorkLog } from '../../../definitions';

export interface IProps {
  className: string;
  employee: IEmployee | null;
  employees: IEmployee[];
  issue: IIssue;
  comments: IComment[];
  addComment: (text: IComment['text']) => void;
  editComment: (id: IComment['id'], text: IComment['text']) => void;
  deleteComment: (id: IComment['id']) => void;
  worklogs: IWorkLog[];
  deleteWorkLog: (id: IWorkLog['id']) => void;
}
