const BASE_URL = 'http://localhost:3001';

export const API = {
  EMPLOYEES: {
    LIST: `${BASE_URL}/employees`,
    DETAIL: (id: number) => `${BASE_URL}/employees/${id}`,
  },
  ISSUES: {
    LIST: `${BASE_URL}/issues`,
    DETAIL: (id: number) => `${BASE_URL}/issues/${id}`,
  },
};
