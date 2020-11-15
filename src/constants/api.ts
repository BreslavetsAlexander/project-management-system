const BASE_URL = 'http://localhost:3001';

export const API = {
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
};
