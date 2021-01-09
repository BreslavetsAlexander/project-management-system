export interface IEmployee {
  id: string;
  idToken: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  projectId: IProject['id'] | null;
}

export interface IWorkLog {
  id: string;
  date: string;
  time: IIssue['originalEstimate'];
  authorId: IEmployee['id'];
}

export interface IIssue {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  projectId: IProject['id'];
  authorId: IEmployee['id'];
  assigneeId: IEmployee['id'];
  originalEstimate: {
    d: number;
    h: number;
    m: number;
  };
  comments: IComment[];
  worklogs: IWorkLog[];
}

export interface IProject {
  id: string;
  title: string;
  description: string;
  issuesCount: number;
}

export interface IActivity {
  id: string;
  text: string;
  date: string;
  employee: Pick<IEmployee, 'firstName' | 'lastName' | 'id'>;
  type: 'issue' | 'project';
  entity: {
    id: string;
    name: string;
  };
}

export interface IComment {
  id: string;
  text: string;
  authorId: IEmployee['id'];
  date: string;
}
