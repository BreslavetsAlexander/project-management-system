import { API } from './../../constants/api';
import { IIssue, IComment, IWorkLog } from './../../definitions';
import { getUrlWithJsonExtension, prepareData } from './../../utils';
import { HttpProvider } from '../httpProvider';
import { ICreateResponce } from '../types';

type IssueResponce = Omit<IIssue, 'id' | 'comments' | 'worklogs'> & {
  comments: {
    [id: string]: Omit<IComment, 'id'>;
  };

  worklogs: {
    [id: string]: Omit<IWorkLog, 'id'>;
  };
};

interface IIssuesResponce {
  [id: string]: IssueResponce;
}

class _IssuesRepository {
  getAll(): Promise<IIssue[]> {
    const url = getUrlWithJsonExtension(API.ISSUES.LIST());

    return HttpProvider.get<IIssuesResponce>(url).then((res) => {
      return prepareData(res).map((issue) => {
        return {
          ...issue,
          comments: prepareData(issue.comments),
          worklogs: prepareData(issue.worklogs),
        };
      });
    });
  }

  getById(id: IIssue['id']): Promise<IIssue> {
    const url = getUrlWithJsonExtension(API.ISSUES.DETAIL(id));

    return HttpProvider.get<IssueResponce>(url).then((res) => {
      return {
        ...res,
        comments: prepareData(res.comments),
        worklogs: prepareData(res.worklogs),
        id,
      };
    });
  }

  create(data: Omit<IIssue, 'id'>): Promise<IIssue> {
    const url = getUrlWithJsonExtension(API.ISSUES.LIST());

    return HttpProvider.post<IIssue, ICreateResponce>(url, data).then((res) => {
      return {
        ...data,
        id: res.name,
      };
    });
  }

  update(id: IIssue['id'], data: Partial<IIssue>) {
    const url = getUrlWithJsonExtension(API.ISSUES.DETAIL(id));

    return HttpProvider.patch<Omit<IIssue, 'id'>>(url, data);
  }

  delete(id: IIssue['id']) {
    const url = getUrlWithJsonExtension(API.ISSUES.DETAIL(id));

    return HttpProvider.delete(url);
  }
}

export const IssuesRepository = new _IssuesRepository();
