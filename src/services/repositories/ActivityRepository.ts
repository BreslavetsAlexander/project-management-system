import { API } from './../../constants/api';
import { IEmployee, IActivity } from './../../definitions';
import { getUrlWithJsonExtension } from './../../utils';
import { HttpProvider } from '../httpProvider';
import { ICreateResponce } from '../types';

class _ActivityRepository {
  create(id: IEmployee['id'], data: Omit<IActivity, 'id'>) {
    const url = getUrlWithJsonExtension(API.EMPLOYEES.ACTIVITY(id));

    return HttpProvider.post<IActivity, ICreateResponce>(url, data);
  }
}

export const ActivityRepository = new _ActivityRepository();
