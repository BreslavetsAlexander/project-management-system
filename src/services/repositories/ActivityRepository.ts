import { API } from './../../constants/api';
import { IActivity } from './../../definitions';
import { HttpProvider, IParams } from '../httpProvider';

class _ActivityRepository {
  getAll(params?: IParams) {
    return HttpProvider.get<IActivity[]>(API.ACTIVITY.LIST(), params);
  }

  create(data: Partial<IActivity>) {
    return HttpProvider.post<IActivity>(API.ACTIVITY.LIST(), data);
  }
}

export const ActivityRepository = new _ActivityRepository();
