import { API } from './../../constants/api';
import { IEmployee } from './../../definitions';
import { getUrlWithJsonExtension } from './../../utils';
import { HttpProvider } from '../httpProvider';

interface IEmployeesResponce {
  [id: string]: Omit<IEmployee, 'id'>;
}

class _EmployeesRepository {
  getAll() {
    const url = getUrlWithJsonExtension(API.EMPLOYEES.LIST());

    return HttpProvider.get<IEmployeesResponce>(url);
  }

  getById(id: number | string) {
    const url = getUrlWithJsonExtension(API.EMPLOYEES.DETAIL(id));

    return HttpProvider.get<IEmployee>(url);
  }

  create(data: Partial<IEmployee>) {
    const url = getUrlWithJsonExtension(API.EMPLOYEES.LIST());

    return HttpProvider.post<IEmployee>(url, data);
  }

  update(id: number | string, data: Partial<Omit<IEmployee, 'id'>>) {
    const url = getUrlWithJsonExtension(API.EMPLOYEES.DETAIL(id));

    return HttpProvider.patch<IEmployee>(url, data);
  }
}

export const EmployeesRepository = new _EmployeesRepository();
