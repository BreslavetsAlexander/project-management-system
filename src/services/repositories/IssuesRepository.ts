import { API } from './../../constants/api';
import { IIssue } from './../../definitions';
import { HttpProvider } from '../httpProvider';

class _IssuesRepository {
  getAll() {
    return HttpProvider.get<IIssue[]>(API.ISSUES.LIST, {
      [API.RELATIONSHIPS.EXPAND]: 'employee',
    });
  }

  getById(id: number | string) {
    return HttpProvider.get<IIssue>(API.ISSUES.DETAIL(id), {
      [API.RELATIONSHIPS.EXPAND]: 'employee',
    });
  }

  getByEmployeeId(employeeId: number | string) {
    return HttpProvider.get<IIssue[]>(API.ISSUES.LIST, { employeeId });
  }

  update(id: number | string, data: Partial<IIssue>) {
    return HttpProvider.patch<IIssue>(API.ISSUES.DETAIL(id), data);
  }
}

export const IssuesRepository = new _IssuesRepository();
