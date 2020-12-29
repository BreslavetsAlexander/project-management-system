import { API } from './../../constants/api';
import { IComment } from './../../definitions';
import { IParams } from './../../utils';
import { HttpProvider } from '../httpProvider';

class _CommentsRepository {
  getAll(params?: IParams) {
    return HttpProvider.get<IComment[]>(API.COMMENTS.LIST(), params);
  }

  create(data: Partial<IComment>) {
    return HttpProvider.post<IComment>(API.COMMENTS.LIST(), data);
  }

  update(id: number | string, data: Partial<IComment>) {
    return HttpProvider.patch<IComment>(API.COMMENTS.DETAIL(id), data);
  }

  delete(id: number | string) {
    return HttpProvider.delete(API.COMMENTS.DETAIL(id));
  }
}

export const CommentsRepository = new _CommentsRepository();
