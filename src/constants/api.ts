const BASE_URL = 'http://localhost:3001';

export const API_KEY = process.env.API_KEY || '';

export const API = {
  REGISTER: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp',
  LOG_IN: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
  EMPLOYEES: {
    LIST: () => `${BASE_URL}/employees`,
    DETAIL: (id: number | string) => `${API.EMPLOYEES.LIST()}/${id}`,
  },
  ISSUES: {
    LIST: () => `${BASE_URL}/issues`,
    DETAIL: (id: number | string) => `${API.ISSUES.LIST()}/${id}`,
  },
  WORKLOGS: {
    LIST: () => `${BASE_URL}/worklogs`,
    DETAIL: (id: number | string) => `${API.WORKLOGS.LIST()}/${id}`,
  },
  PROJECTS: {
    LIST: () => `${BASE_URL}/projects`,
    DETAIL: (id: number | string) => `${API.PROJECTS.LIST()}/${id}`,
  },
  COMMENTS: {
    LIST: () => `${BASE_URL}/comments`,
    DETAIL: (id: number | string) => `${API.COMMENTS.LIST()}/${id}`,
  },
  ACTIVITY: {
    LIST: () => `${BASE_URL}/activity`,
  },
};

const NEW_BASE_URL = process.env.API_URL || '';

export const NEW_API = {
  EMPLOYEES: {
    LIST: () => `${NEW_BASE_URL}/employees`,
    DETAIL: (id: number | string) => `${NEW_API.EMPLOYEES.LIST()}/${id}`,
  },
};
