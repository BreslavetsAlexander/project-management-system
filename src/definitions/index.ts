export interface IEmployee {
  id: number;
  name: string;
  email: string;
  issues: IIssue[];
}

export interface IWorkLog {
  id: number;
  date: string;
  time: string;
  issueId: number;
}

export interface IIssue {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  employeeId: number;
  employee: IEmployee;
  authorId: number;
}
