import { IEmployee, IComment } from '../../../../definitions';

export interface IProps {
  employee: IEmployee | null;
  employees: IEmployee[];
  comments: IComment[];
  addComment: (text: IComment['text']) => void;
  editComment: (id: IComment['id'], text: IComment['text']) => void;
  deleteComment: (id: IComment['id']) => void;
}

export interface IState {
  editedCommentId: IComment['id'] | null;
}

export type IFormValues = Pick<IComment, 'text'>;
