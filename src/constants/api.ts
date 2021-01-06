const BASE_URL = process.env.API_URL || '';

export const API_KEY = process.env.API_KEY || '';

export const API = {
  REGISTER: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp',
  LOG_IN: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
  UPDATE_EMAIL_OR_PASSWORD: 'https://identitytoolkit.googleapis.com/v1/accounts:update',
  EMPLOYEES: {
    LIST: () => `${BASE_URL}/employees`,
    DETAIL: (id: number | string) => `${API.EMPLOYEES.LIST()}/${id}`,
  },
  PROJECTS: {
    LIST: () => `${BASE_URL}/projects`,
    DETAIL: (id: number | string) => `${API.PROJECTS.LIST()}/${id}`,
    ISSUES: {
      LIST: (projectId: number | string) => `${API.PROJECTS.DETAIL(projectId)}/issues`,
      DETAIL: (projectId: number | string, issueId: number | string) => {
        return `${API.PROJECTS.ISSUES.LIST(projectId)}/${issueId}`;
      },
      COMMENTS: {
        LIST: (projectId: number | string, issueId: number | string) => {
          return `${API.PROJECTS.ISSUES.DETAIL(projectId, issueId)}/comments`;
        },
        DETAIL: (
          projectId: number | string,
          issueId: number | string,
          commentId: number | string,
        ) => {
          return `${API.PROJECTS.ISSUES.COMMENTS.LIST(projectId, issueId)}/${commentId}`;
        },
      },
      WORKLOGS: {
        LIST: (projectId: number | string, issueId: number | string) => {
          return `${API.PROJECTS.ISSUES.DETAIL(projectId, issueId)}/worklogs`;
        },
        DETAIL: (
          projectId: number | string,
          issueId: number | string,
          worklogId: number | string,
        ) => `${API.PROJECTS.ISSUES.WORKLOGS.LIST(projectId, issueId)}/${worklogId}`,
      },
    },
  },
  ACTIVITY: {
    LIST: () => `${BASE_URL}/activity`,
  },
};
