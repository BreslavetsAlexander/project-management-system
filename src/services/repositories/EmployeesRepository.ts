import { API } from './../../constants/api';
import { IEmployee } from './../../definitions';
import { HttpProvider } from '../httpProvider';

class _EmployeesRepository {
  getAll() {
    return HttpProvider.get<IEmployee[]>(API.EMPLOYEES.LIST, {
      [API.RELATIONSHIPS.EMBED]: 'issues',
    });
  }

  getById(id: number) {
    return HttpProvider.get<IEmployee>(API.EMPLOYEES.DETAIL(id), {
      [API.RELATIONSHIPS.EMBED]: 'issues',
    });
  }
}

export const EmployeesRepository = new _EmployeesRepository();
