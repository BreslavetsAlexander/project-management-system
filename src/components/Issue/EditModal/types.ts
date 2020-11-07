import { IIssue } from '../../../definitions';

export interface IProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  issueId: IIssue['id'];
  values: Pick<IIssue, 'title' | 'description' | 'priority'>;
  onSubmit: (values: IProps['values']) => void;
}
