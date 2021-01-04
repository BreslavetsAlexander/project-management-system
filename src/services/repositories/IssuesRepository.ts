import { API } from './../../constants/api';
import { IIssue, IComment, IWorkLog } from './../../definitions';
import { IParams, getUrlWithJsonExtension } from './../../utils';
import { HttpProvider } from '../httpProvider';

interface ICreateIssueResponce {
  name: string;
}

type IssueResponce = Omit<IIssue, 'id' | 'comments' | 'worklogs'> & {
  comments: {
    [id: string]: Omit<IComment, 'id'>;
  };

  worklogs: {
    [id: string]: Omit<IWorkLog, 'id'>;
  };
};

class _IssuesRepository {
  getById(projectId: number | string, issueId: number | string, params?: IParams) {
    const url = getUrlWithJsonExtension(API.PROJECTS.ISSUES.DETAIL(projectId, issueId));

    return HttpProvider.get<IssueResponce>(url, params);
  }

  create(projectId: number | string, data: Partial<IIssue>) {
    const url = getUrlWithJsonExtension(API.PROJECTS.ISSUES.LIST(projectId));

    return HttpProvider.post<IIssue, ICreateIssueResponce>(url, data);
  }

  update(projectId: number | string, issueId: number | string, data: Partial<IIssue>) {
    const url = getUrlWithJsonExtension(API.PROJECTS.ISSUES.DETAIL(projectId, issueId));

    return HttpProvider.patch<Omit<IIssue, 'id'>>(url, data);
  }

  delete(projectId: number | string, issueId: number | string) {
    const url = getUrlWithJsonExtension(API.PROJECTS.ISSUES.DETAIL(projectId, issueId));

    return HttpProvider.delete(url);
  }
}

export const IssuesRepository = new _IssuesRepository();
