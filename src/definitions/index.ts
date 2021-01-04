export interface IEmployee {
  id: number | string;
  idToken: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  projectId: number | string | null;
}

export interface IWorkLog {
  id: number | string;
  date: string;
  time: IIssue['originalEstimate'];
  employee: Pick<IEmployee, 'firstName' | 'lastName' | 'id'>;
}

export interface IIssue {
  id: number | string;
  title: string;
  description: string;
  status: string;
  priority: string;
  project: Pick<IProject, 'id' | 'title'>;
  author: Pick<IEmployee, 'firstName' | 'lastName' | 'id'>;
  assignee: Pick<IEmployee, 'firstName' | 'lastName' | 'id'>;
  originalEstimate: {
    d: number;
    h: number;
    m: number;
  };
  comments: IComment[];
  worklogs: IWorkLog[];
}

export interface IProject {
  id: number | string;
  title: string;
  description: string;
  issues: IIssue[];
}

export interface IActivity {
  id: number | string;
  text: string;
  date: string;
  employee: Pick<IEmployee, 'firstName' | 'lastName' | 'id'>;
  type: 'issue' | 'project';
  entity: {
    id: number | string;
    name: string;
  };
}

export interface IComment {
  id: number | string;
  text: string;
  author: Pick<IEmployee, 'firstName' | 'lastName' | 'id'>;
  date: string;
}
