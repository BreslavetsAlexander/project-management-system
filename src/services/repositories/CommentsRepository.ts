import { API } from './../../constants/api';
import { IComment } from './../../definitions';
import { getUrlWithJsonExtension } from './../../utils';
import { HttpProvider } from '../httpProvider';

interface ICreateCommentResponce {
  name: string;
}

class _CommentsRepository {
  create(projectId: string | number, issueId: string | number, data: Partial<IComment>) {
    const url = getUrlWithJsonExtension(API.PROJECTS.ISSUES.COMMENTS.LIST(projectId, issueId));

    return HttpProvider.post<IComment, ICreateCommentResponce>(url, data);
  }

  update(
    projectId: string | number,
    issueId: string | number,
    id: number | string,
    data: Partial<IComment>,
  ) {
    const url = getUrlWithJsonExtension(
      API.PROJECTS.ISSUES.COMMENTS.DETAIL(projectId, issueId, id),
    );

    return HttpProvider.patch<Omit<IComment, 'id'>>(url, data);
  }

  delete(projectId: string | number, issueId: string | number, id: number | string) {
    const url = getUrlWithJsonExtension(
      API.PROJECTS.ISSUES.COMMENTS.DETAIL(projectId, issueId, id),
    );

    return HttpProvider.delete(url);
  }
}

export const CommentsRepository = new _CommentsRepository();
