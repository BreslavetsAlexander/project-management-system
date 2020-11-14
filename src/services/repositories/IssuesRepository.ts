import { API } from './../../constants/api';
import { IIssue } from './../../definitions';
import { HttpProvider, IParams } from '../httpProvider';

class _IssuesRepository {
  getAll<T = IIssue>(params?: IParams) {
    return HttpProvider.get<T[]>(API.ISSUES.LIST, params);
  }

  getById<T = IIssue>(id: number | string, params?: IParams) {
    return HttpProvider.get<T>(API.ISSUES.DETAIL(id), params);
  }

  update(id: number | string, data: Partial<IIssue>) {
    return HttpProvider.patch<IIssue>(API.ISSUES.DETAIL(id), data);
  }
}

export const IssuesRepository = new _IssuesRepository();
