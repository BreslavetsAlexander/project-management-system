import { API } from './../../constants/api';
import { IEmployee, IActivity } from './../../definitions';
import { getUrlWithJsonExtension } from './../../utils';
import { HttpProvider } from '../httpProvider';

interface ICreateActivityResponce {
  name: string;
}

class _ActivityRepository {
  create(id: IEmployee['id'], data: Omit<IActivity, 'id'>) {
    const url = getUrlWithJsonExtension(API.EMPLOYEES.ACTIVITY(id));

    return HttpProvider.post<IActivity, ICreateActivityResponce>(url, data);
  }
}

export const ActivityRepository = new _ActivityRepository();
