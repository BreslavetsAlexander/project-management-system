export interface IEmployee {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  currentProjectId: number;
}

export interface IWorkLog {
  id: number;
  date: string;
  time: IIssue['originalEstimate'];
  issueId: number;
  employee: Pick<IEmployee, 'firstName' | 'lastName' | 'id'>;
}

export interface IIssue {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  currentProjectId: number;
  author: Pick<IEmployee, 'firstName' | 'lastName' | 'id'>;
  assignee: Pick<IEmployee, 'firstName' | 'lastName' | 'id'>;
  originalEstimate: {
    d: number;
    h: number;
    m: number;
  };
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
  employee: Pick<IEmployee, 'firstName' | 'lastName' | 'id'>;
  type: 'issue' | 'project';
  entity: {
    id: number;
    name: string;
  };
}

export interface IComment {
  id: number;
  text: string;
  author: Pick<IEmployee, 'firstName' | 'lastName' | 'id'>;
  date: string;
}
