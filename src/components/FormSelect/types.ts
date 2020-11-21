interface IOption {
  title: string;
  value: string | number;
}

export interface IProps {
  label?: string;
  name: string;
  options: IOption[];
  message?: string;
}
