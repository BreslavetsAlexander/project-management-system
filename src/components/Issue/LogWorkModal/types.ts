import { IFormLogWorkValues } from '../../../pages/Issue/types';

export interface IProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onSubmit: (values: IFormLogWorkValues) => void;
}
