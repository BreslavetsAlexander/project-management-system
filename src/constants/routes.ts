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
  },
  ISSUES: {
    LIST: '/issues',
    DETAIL: {
      TEMPLATE: '/issues/:id',
      ROUTE: (id: number | string) => buildRoute(ROUTES.ISSUES.DETAIL.TEMPLATE, `${id}`),
    },
  },
  PROFILE: '/profile',
  NOT_FOUND: '/*',
};
