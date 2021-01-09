import { API } from './../../constants/api';
import { IIssue, IComment } from './../../definitions';
import { getUrlWithJsonExtension } from './../../utils';
import { HttpProvider } from '../httpProvider';

interface ICreateCommentResponce {
  name: string;
}

class _CommentsRepository {
  create(issueId: IIssue['id'], data: Omit<IComment, 'id'>): Promise<IComment> {
    const url = getUrlWithJsonExtension(API.ISSUES.COMMENTS.LIST(issueId));

    return HttpProvider.post<IComment, ICreateCommentResponce>(url, data).then((res) => {
      return {
        ...data,
        id: res.name,
      };
    });
  }

  update(issueId: IIssue['id'], id: IComment['id'], data: Partial<IComment>) {
    const url = getUrlWithJsonExtension(API.ISSUES.COMMENTS.DETAIL(issueId, id));

    return HttpProvider.patch<Omit<IComment, 'id'>>(url, data);
  }

  delete(issueId: IIssue['id'], id: IComment['id']) {
    const url = getUrlWithJsonExtension(API.ISSUES.COMMENTS.DETAIL(issueId, id));

    return HttpProvider.delete(url);
  }
}

export const CommentsRepository = new _CommentsRepository();
