import { API, NEW_API } from './../../constants/api';
import { IEmployee } from './../../definitions';
import { IParams, getUrlWithJsonExtension } from './../../utils';
import { HttpProvider } from '../httpProvider';

class _EmployeesRepository {
  getAll(params?: IParams) {
    return HttpProvider.get<IEmployee[]>(API.EMPLOYEES.LIST(), params);
  }

  getById(id: number | string) {
    const url = getUrlWithJsonExtension(NEW_API.EMPLOYEES.DETAIL(id));

    return HttpProvider.get<IEmployee>(url);
  }

  create(data: Partial<IEmployee>) {
    const url = getUrlWithJsonExtension(NEW_API.EMPLOYEES.LIST());

    return HttpProvider.post<IEmployee>(url, data);
  }

  update(id: number | string, data: Partial<Omit<IEmployee, 'id'>>) {
    const url = getUrlWithJsonExtension(NEW_API.EMPLOYEES.DETAIL(id));

    return HttpProvider.patch<IEmployee>(url, data);
  }
}

export const EmployeesRepository = new _EmployeesRepository();
