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

  update(id: number | string, data: Partial<IIssue>) {
    return HttpProvider.patch<IIssue>(API.ISSUES.DETAIL(id), data);
  }
}

export const IssuesRepository = new _IssuesRepository();
