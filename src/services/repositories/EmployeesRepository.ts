import { API } from './../../constants/api';
import { IEmployee } from './../../definitions';
import { getUrlWithJsonExtension, prepareData } from './../../utils';
import { HttpProvider } from '../httpProvider';

type EmployeeResponce = Omit<IEmployee, 'id'>;

interface IEmployeesResponce {
  [id: string]: EmployeeResponce;
}

class _EmployeesRepository {
  getAll(): Promise<IEmployee[]> {
    const url = getUrlWithJsonExtension(API.EMPLOYEES.LIST());

    return HttpProvider.get<IEmployeesResponce>(url).then(prepareData);
  }

  getById(id: IEmployee['id']) {
    const url = getUrlWithJsonExtension(API.EMPLOYEES.DETAIL(id));

    return HttpProvider.get<IEmployee>(url);
  }

  create(data: Partial<IEmployee>) {
    const url = getUrlWithJsonExtension(API.EMPLOYEES.LIST());

    return HttpProvider.post<IEmployee>(url, data);
  }

  update(id: IEmployee['id'], data: Partial<Omit<IEmployee, 'id'>>) {
    const url = getUrlWithJsonExtension(API.EMPLOYEES.DETAIL(id));

    return HttpProvider.patch<IEmployee>(url, data);
  }
}

export const EmployeesRepository = new _EmployeesRepository();
