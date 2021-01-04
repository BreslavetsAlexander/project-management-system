import { API } from './../../constants/api';
import { IProject, IIssue } from './../../definitions';
import { IParams, getUrlWithJsonExtension } from './../../utils';
import { HttpProvider } from '../httpProvider';

interface ICreateProjectResponce {
  name: string;
}

type ProjectResponce = Pick<IProject, 'title' | 'description'> & {
  issues: {
    [id: string]: Omit<IIssue, 'id'>;
  };
};

interface IProjectsResponce {
  [id: string]: ProjectResponce;
}

class _ProjectsRepository {
  getAll() {
    const url = getUrlWithJsonExtension(API.PROJECTS.LIST());

    return HttpProvider.get<IProjectsResponce>(url);
  }

  getById(id: number | string, params?: IParams) {
    const url = getUrlWithJsonExtension(API.PROJECTS.DETAIL(id));

    return HttpProvider.get<ProjectResponce>(url, params);
  }

  create(data: Partial<IProject>) {
    const url = getUrlWithJsonExtension(API.PROJECTS.LIST());

    return HttpProvider.post<IProject, ICreateProjectResponce>(url, data);
  }

  update(id: number | string, data: Partial<IProject>) {
    const url = getUrlWithJsonExtension(API.PROJECTS.DETAIL(id));

    return HttpProvider.patch<Omit<IProject, 'id'>>(url, data);
  }

  delete(id: number | string) {
    const url = getUrlWithJsonExtension(API.PROJECTS.DETAIL(id));

    return HttpProvider.delete(url);
  }
}

export const ProjectsRepository = new _ProjectsRepository();
