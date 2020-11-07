const BASE_URL = 'http://localhost:3001';

export const API = {
  EMPLOYEES: {
    LIST: `${BASE_URL}/employees`,
    DETAIL: (id: number | string) => `${BASE_URL}/employees/${id}`,
  },
  ISSUES: {
    LIST: `${BASE_URL}/issues`,
    DETAIL: (id: number | string) => `${BASE_URL}/issues/${id}`,
  },
  WORKLOGS: {
    LIST: `${BASE_URL}/worklogs`,
    DETAIL: (id: number | string) => `${BASE_URL}/worklogs/${id}`,
  },
  RELATIONSHIPS: {
    EMBED: '_embed',
    EXPAND: '_expand',
  },
};
