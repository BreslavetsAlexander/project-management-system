import { API } from './../../constants/api';
import { IActivity } from './../../definitions';
import { getUrlWithJsonExtension } from './../../utils';
import { HttpProvider } from '../httpProvider';

interface IActivityResponce {
  [id: string]: Omit<IActivity, 'id'>;
}

interface ICreateActivityResponce {
  name: string;
}

class _ActivityRepository {
  getAll() {
    const url = getUrlWithJsonExtension(API.ACTIVITY.LIST());

    return HttpProvider.get<IActivityResponce>(url);
  }

  create(data: Partial<IActivity>) {
    const url = getUrlWithJsonExtension(API.ACTIVITY.LIST());

    return HttpProvider.post<IActivity, ICreateActivityResponce>(url, data);
  }
}

export const ActivityRepository = new _ActivityRepository();
