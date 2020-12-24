import { IIssue, IComment } from '../../../definitions';

export interface IProps {
  className: string;
  priority: IIssue['priority'];
  description: IIssue['description'];
  comments: IComment[];
  addComment: (text: IComment['text']) => void;
  editComment: (id: IComment['id'], text: IComment['text']) => void;
  deleteComment: (id: IComment['id']) => void;
}
