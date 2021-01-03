import { NEW_API } from './../../constants/api';
import { IProject, IIssue } from './../../definitions';
import { IParams, getUrlWithJsonExtension } from './../../utils';
import { HttpProvider } from '../httpProvider';

interface ICreateProjectResponce {
  name: string;
}

interface IProjectsResponce {
  [id: string]: Pick<IProject, 'title' | 'description'> & {
    issues: {
      [id: string]: Omit<IIssue, 'id'>;
    };
  };
}

class _ProjectsRepository {
  getAll() {
    const url = getUrlWithJsonExtension(NEW_API.PROJECTS.LIST());

    return HttpProvider.get<IProjectsResponce>(url);
  }

  getById(id: number | string, params?: IParams) {
    const url = getUrlWithJsonExtension(NEW_API.PROJECTS.DETAIL(id));

    return HttpProvider.get<Omit<IProject, 'id'>>(url, params);
  }

  create(data: Partial<IProject>) {
    const url = getUrlWithJsonExtension(NEW_API.PROJECTS.LIST());

    return HttpProvider.post<IProject, ICreateProjectResponce>(url, data);
  }

  update(id: number | string, data: Partial<IProject>) {
    const url = getUrlWithJsonExtension(NEW_API.PROJECTS.DETAIL(id));

    return HttpProvider.patch<Omit<IProject, 'id'>>(url, data);
  }

  delete(id: number | string) {
    const url = getUrlWithJsonExtension(NEW_API.PROJECTS.DETAIL(id));

    return HttpProvider.delete(url);
  }
}

export const ProjectsRepository = new _ProjectsRepository();
