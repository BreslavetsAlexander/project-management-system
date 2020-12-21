export interface IEmployee {
  id: number;
  name: string;
  email: string;
  currentProjectId: number;
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
  currentEmployeeId: number;
  currentProjectId: number;
  authorId: number;
}

export interface IProject {
  id: number;
  title: string;
  description: string;
}

export interface IActivity {
  id: number;
  text: string;
  date: string;
  employee: Pick<IEmployee, 'name' | 'id'>;
  type: 'issue' | 'project';
  entity: {
    id: number;
    name: string;
  };
}
