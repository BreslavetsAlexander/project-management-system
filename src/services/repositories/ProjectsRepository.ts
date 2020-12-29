import { API } from './../../constants/api';
import { IProject } from './../../definitions';
import { IParams } from './../../utils';
import { HttpProvider } from '../httpProvider';

class _ProjectsRepository {
  getAll(params?: IParams) {
    return HttpProvider.get<IProject[]>(API.PROJECTS.LIST(), params);
  }

  getById(id: number | string, params?: IParams) {
    return HttpProvider.get<IProject>(API.PROJECTS.DETAIL(id), params);
  }

  create(data: Partial<IProject>) {
    return HttpProvider.post<IProject>(API.PROJECTS.LIST(), data);
  }

  update(id: number | string, data: Partial<IProject>) {
    return HttpProvider.patch<IProject>(API.PROJECTS.DETAIL(id), data);
  }

  delete(id: number | string) {
    return HttpProvider.delete(API.PROJECTS.DETAIL(id));
  }
}

export const ProjectsRepository = new _ProjectsRepository();
