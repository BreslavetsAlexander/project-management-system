import { API } from './../../constants/api';
import { IProject } from './../../definitions';
import { getUrlWithJsonExtension, prepareData } from './../../utils';
import { HttpProvider } from '../httpProvider';
import { ICreateResponce } from '../types';

type ProjectResponce = Omit<IProject, 'id'>;

interface IProjectsResponce {
  [id: string]: ProjectResponce;
}

class _ProjectsRepository {
  getAll(): Promise<IProject[]> {
    const url = getUrlWithJsonExtension(API.PROJECTS.LIST());

    return HttpProvider.get<IProjectsResponce>(url).then(prepareData);
  }

  getById(id: IProject['id']): Promise<IProject> {
    const url = getUrlWithJsonExtension(API.PROJECTS.DETAIL(id));

    return HttpProvider.get<ProjectResponce>(url).then((res) => {
      return {
        ...res,
        id,
      };
    });
  }

  create(data: Omit<IProject, 'id'>): Promise<IProject> {
    const url = getUrlWithJsonExtension(API.PROJECTS.LIST());

    return HttpProvider.post<IProject, ICreateResponce>(url, data).then((res) => {
      return {
        ...data,
        id: res.name,
      };
    });
  }

  update(id: IProject['id'], data: Partial<IProject>) {
    const url = getUrlWithJsonExtension(API.PROJECTS.DETAIL(id));

    return HttpProvider.patch<Omit<IProject, 'id'>>(url, data);
  }

  delete(id: IProject['id']) {
    const url = getUrlWithJsonExtension(API.PROJECTS.DETAIL(id));

    return HttpProvider.delete(url);
  }
}

export const ProjectsRepository = new _ProjectsRepository();
