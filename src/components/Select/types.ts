interface IOption {
  title: string;
  value: number;
}

export interface IProps {
  options: IOption[];
  onChange?: (value: IOption['value']) => void;
  className?: string;
  defaultValue?: IOption['value'];
  placeholder?: string;
}
