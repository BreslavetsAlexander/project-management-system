interface IOption {
  title: string | number;
  value: string | number;
}

export interface IProps {
  label?: string;
  name: string;
  options: IOption[];
  message?: string;
  empty?: string;
}
