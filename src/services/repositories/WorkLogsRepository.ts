import { API } from './../../constants/api';
import { IWorkLog } from './../../definitions';
import { HttpProvider } from '../httpProvider';

class _WorkLogsRepository {
  getByIssueId(issueId: number | string) {
    return HttpProvider.get<IWorkLog[]>(API.WORKLOGS.LIST(), { issueId });
  }

  create(data: Partial<IWorkLog>) {
    return HttpProvider.post<IWorkLog>(API.WORKLOGS.LIST(), data);
  }

  delete(id: number | string) {
    return HttpProvider.delete(API.WORKLOGS.DETAIL(id));
  }
}

export const WorkLogsRepository = new _WorkLogsRepository();
