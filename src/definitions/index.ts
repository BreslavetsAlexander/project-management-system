export interface IEmployee {
  id: number;
  name: string;
  email: string;
}

export interface IIssue {
  id: number;
  title: string;
  description: string;
  status: string;
  employeeId: number | null;
}

export interface IEmployeeWithIssues extends IEmployee {
  issues: IIssue[];
}
