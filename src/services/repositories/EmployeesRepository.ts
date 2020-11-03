import { API } from './../../constants/api';
import { IEmployee } from './../../definitions';
import { HttpProvider } from '../httpProvider';

class _EmployeesRepository {
  getAll() {
    return HttpProvider.get<IEmployee[]>(API.EMPLOYEES.LIST);
  }

  getById(id: number) {
    return HttpProvider.get<IEmployee>(API.EMPLOYEES.DETAIL(id));
  }
}

export const EmployeesRepository = new _EmployeesRepository();
