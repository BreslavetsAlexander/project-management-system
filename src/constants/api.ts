import { IEmployee, IProject, IIssue, IComment, IWorkLog } from '../definitions';

const BASE_URL = process.env.REACT_APP_API_URL || '';
const KEY = process.env.REACT_APP_API_KEY || '';

export const API = {
  KEY,
  REGISTER: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp',
  LOG_IN: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
  UPDATE_EMAIL_OR_PASSWORD: 'https://identitytoolkit.googleapis.com/v1/accounts:update',
  EMPLOYEES: {
    LIST: () => `${BASE_URL}/employees`,
    DETAIL: (id: IEmployee['id']) => `${API.EMPLOYEES.LIST()}/${id}`,
    ACTIVITY: (id: IEmployee['id']) => `${API.EMPLOYEES.DETAIL(id)}/activity`,
  },
  PROJECTS: {
    LIST: () => `${BASE_URL}/projects`,
    DETAIL: (id: IProject['id']) => `${API.PROJECTS.LIST()}/${id}`,
  },
  ISSUES: {
    LIST: () => `${BASE_URL}/issues`,
    DETAIL: (id: IIssue['id']) => `${API.ISSUES.LIST()}/${id}`,
    COMMENTS: {
      LIST: (issueId: IIssue['id']) => `${API.ISSUES.DETAIL(issueId)}/comments`,
      DETAIL: (issueId: IIssue['id'], commentId: IComment['id']) => {
        return `${API.ISSUES.COMMENTS.LIST(issueId)}/${commentId}`;
      },
    },
    WORKLOGS: {
      LIST: (issueId: IIssue['id']) => `${API.ISSUES.DETAIL(issueId)}/worklogs`,
      DETAIL: (issueId: IIssue['id'], worklogId: IWorkLog['id']) => {
        return `${API.ISSUES.WORKLOGS.LIST(issueId)}/${worklogId}`;
      },
    },
  },
};
