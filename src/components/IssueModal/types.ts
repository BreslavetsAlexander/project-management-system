import { IIssue } from '../../definitions';

export interface IProps {
  title: string;
  buttonText: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  values: Pick<IIssue, 'title' | 'description' | 'priority' | 'originalEstimate'>;
  onSubmit: (values: IProps['values']) => void;
}

export type IFormValues = Pick<IIssue, 'title' | 'description' | 'priority'> &
  IIssue['originalEstimate'];
