import { API } from './../../constants/api';
import { IIssue } from './../../definitions';
import { HttpProvider } from '../httpProvider';

class _IssuesRepository {
  getAll() {
    return HttpProvider.get<IIssue[]>(API.ISSUES.LIST);
  }

  getById(id: number) {
    return HttpProvider.get<IIssue>(API.ISSUES.DETAIL(id));
  }

  getByEmployeeId(employeeId: number) {
    return HttpProvider.get<IIssue[]>(API.ISSUES.LIST, { employeeId });
  }
}

export const IssuesRepository = new _IssuesRepository();
