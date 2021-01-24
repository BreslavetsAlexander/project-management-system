export interface IEmployee {
  id: string;
  idToken: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  projectId: IProject['id'] | null;
  activity: IActivity[];
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
  createdAt: string;
}

export interface IProject {
  id: string;
  title: string;
  description: string;
  issuesCount: number;
  authorId: IEmployee['id'];
}

export interface IActivity {
  id: string;
  text: string;
  date: string;
  link: string;
  type: 'issue' | 'project';
}

export interface IComment {
  id: string;
  text: string;
  authorId: IEmployee['id'];
  date: string;
}
