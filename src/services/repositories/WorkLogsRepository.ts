import { API } from './../../constants/api';
import { IWorkLog } from './../../definitions';
import { HttpProvider } from '../httpProvider';
import { getUrlWithJsonExtension } from '../../utils';

interface ICreateWorkLogResponce {
  name: string;
}

class _WorkLogsRepository {
  create(projectId: string | number, issueId: string | number, data: Partial<IWorkLog>) {
    const url = getUrlWithJsonExtension(API.PROJECTS.ISSUES.WORKLOGS.LIST(projectId, issueId));

    return HttpProvider.post<IWorkLog, ICreateWorkLogResponce>(url, data);
  }

  delete(projectId: string | number, issueId: string | number, id: number | string) {
    const url = getUrlWithJsonExtension(
      API.PROJECTS.ISSUES.WORKLOGS.DETAIL(projectId, issueId, id),
    );

    return HttpProvider.delete(url);
  }
}

export const WorkLogsRepository = new _WorkLogsRepository();
