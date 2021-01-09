export interface IEmployee {
  id: number | string;
  idToken: number | string;
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
  authorId: IEmployee['id'];
}

export interface IIssue {
  id: number | string;
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
  id: number | string;
  title: string;
  description: string;
  issuesCount: number;
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
  authorId: IEmployee['id'];
  date: string;
}
