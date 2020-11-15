import { IProject } from '../../definitions';

export interface IProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  values: Pick<IProject, 'title' | 'description'>;
  onSubmit: (values: IProps['values']) => void;
  title: string;
  buttonText: string;
}
