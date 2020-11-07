import { IIssue } from '../../../definitions';

export interface IProps {
  className: string;
  priority: IIssue['priority'];
  description: IIssue['description'];
}
