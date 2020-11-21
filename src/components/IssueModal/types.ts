import { IIssue } from '../../definitions';

export interface IProps {
  title: string;
  buttonText: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  values: Pick<IIssue, 'title' | 'description' | 'priority'>;
  onSubmit: (values: IProps['values']) => void;
}
