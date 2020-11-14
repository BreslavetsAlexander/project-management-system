import { API } from './../../constants/api';
import { IProject } from './../../definitions';
import { HttpProvider, IParams } from '../httpProvider';

class _ProjectsRepository {
  getAll<T = IProject>(params?: IParams) {
    return HttpProvider.get<T[]>(API.PROJECTS.LIST, params);
  }

  getById<T = IProject>(id: number | string, params?: IParams) {
    return HttpProvider.get<T>(API.PROJECTS.DETAIL(id), params);
  }
}

export const ProjectsRepository = new _ProjectsRepository();
