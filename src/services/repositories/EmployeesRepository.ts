import { API } from './../../constants/api';
import { IEmployee } from './../../definitions';
import { HttpProvider, IParams } from '../httpProvider';

class _EmployeesRepository {
  getAll(params?: IParams) {
    return HttpProvider.get<IEmployee[]>(API.EMPLOYEES.LIST(), params);
  }

  getById(id: number | string, params?: IParams) {
    return HttpProvider.get<IEmployee>(API.EMPLOYEES.DETAIL(id), params);
  }
}

export const EmployeesRepository = new _EmployeesRepository();
