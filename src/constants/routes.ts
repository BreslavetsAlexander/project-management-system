const buildRoute = (template: string, value: string): string => {
  return template.replace(/:[A-Za-z]+/gi, value);
};

export const ROUTES = {
  HOME: '/',
  PROJECTS: {
    LIST: '/projects',
    DETAIL: {
      TEMPLATE: '/projects/:id',
      ROUTE: (id: number | string) => buildRoute(ROUTES.PROJECTS.DETAIL.TEMPLATE, `${id}`),
    },
    ISSUE: {
      TEMPLATE: '/projects/:projectId/:issueId',
      ROUTE: (projectId: number | string, issueId: number | string) => {
        return `${ROUTES.PROJECTS.DETAIL.ROUTE(projectId)}/${issueId}`;
      },
    },
  },
  PROFILE: '/profile',
  LOG_IN: '/login',
  REGISTRATION: '/registration',
  NOT_FOUND: '/*',
};
