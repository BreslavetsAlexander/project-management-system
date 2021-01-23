import { IProject, IIssue } from '../definitions';

const buildRoute = (template: string, value: string) => template.replace(/:[A-Za-z]+/gi, value);

export const ROUTES = {
  HOME: '/',
  PROJECTS: {
    LIST: '/projects',
    DETAIL: {
      TEMPLATE: '/projects/:id',
      ROUTE: (id: IProject['id']) => buildRoute(ROUTES.PROJECTS.DETAIL.TEMPLATE, `${id}`),
    },
    ISSUE: {
      TEMPLATE: '/projects/:projectId/:issueId',
      ROUTE: (projectId: IProject['id'], issueId: IIssue['id']) => {
        return `${ROUTES.PROJECTS.DETAIL.ROUTE(projectId)}/${issueId}`;
      },
    },
  },
  PROFILE: '/profile',
  LOG_IN: '/login',
  REGISTRATION: '/registration',
  NOT_FOUND: '/*',
};
