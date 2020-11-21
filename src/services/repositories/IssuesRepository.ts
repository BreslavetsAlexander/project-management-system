import { API } from './../../constants/api';
import { IIssue } from './../../definitions';
import { HttpProvider, IParams } from '../httpProvider';

class _IssuesRepository {
  getAll(params?: IParams) {
    return HttpProvider.get<IIssue[]>(API.ISSUES.LIST(), params);
  }

  getById(id: number | string, params?: IParams) {
    return HttpProvider.get<IIssue>(API.ISSUES.DETAIL(id), params);
  }

  create(data: Partial<IIssue>) {
    return HttpProvider.post<IIssue>(API.ISSUES.LIST(), data);
  }

  update(id: number | string, data: Partial<IIssue>) {
    return HttpProvider.patch<IIssue>(API.ISSUES.DETAIL(id), data);
  }

  delete(id: number | string) {
    return HttpProvider.delete(API.ISSUES.DETAIL(id));
  }
}

export const IssuesRepository = new _IssuesRepository();
