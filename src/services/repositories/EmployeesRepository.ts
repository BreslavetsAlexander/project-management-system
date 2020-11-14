import { API } from './../../constants/api';
import { IEmployee } from './../../definitions';
import { HttpProvider, IParams } from '../httpProvider';

class _EmployeesRepository {
  getAll<T = IEmployee>(params?: IParams) {
    return HttpProvider.get<T[]>(API.EMPLOYEES.LIST, params);
  }

  getById<T = IEmployee>(id: number | string, params?: IParams) {
    return HttpProvider.get<T>(API.EMPLOYEES.DETAIL(id), params);
  }
}

export const EmployeesRepository = new _EmployeesRepository();
