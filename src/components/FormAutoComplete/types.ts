interface IOption {
  value: string;
  label: string;
}

export interface IProps {
  label: string;
  name: string;
  message?: string;
  options: IOption[];
}
