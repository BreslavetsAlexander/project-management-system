const buildRoute = (template: string, value: string): string => {
  return template.replace(/:[A-Za-z]+/gi, value);
};

export const ROUTES = {
  HOME: '/',
  BOARD: '/board',
  ISSUES: {
    LIST: '/issues',
    DETAIL: {
      TEMPLATE: '/issues/:id',
      ROUTE: (id: number | string) => buildRoute(ROUTES.ISSUES.DETAIL.TEMPLATE, `${id}`),
    },
  },
};
