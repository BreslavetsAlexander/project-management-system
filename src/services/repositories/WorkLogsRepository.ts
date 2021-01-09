import { API } from './../../constants/api';
import { IIssue, IWorkLog } from './../../definitions';
import { HttpProvider } from '../httpProvider';
import { getUrlWithJsonExtension } from '../../utils';

interface ICreateWorkLogResponce {
  name: string;
}

class _WorkLogsRepository {
  create(issueId: IIssue['id'], data: Omit<IWorkLog, 'id'>): Promise<IWorkLog> {
    const url = getUrlWithJsonExtension(API.ISSUES.WORKLOGS.LIST(issueId));

    return HttpProvider.post<IWorkLog, ICreateWorkLogResponce>(url, data).then((res) => {
      return {
        ...data,
        id: res.name,
      };
    });
  }

  delete(issueId: IIssue['id'], id: IWorkLog['id']) {
    const url = getUrlWithJsonExtension(API.ISSUES.WORKLOGS.DETAIL(issueId, id));

    return HttpProvider.delete(url);
  }
}

export const WorkLogsRepository = new _WorkLogsRepository();
