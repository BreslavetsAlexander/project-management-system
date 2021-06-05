import { API } from './../../constants/api';
import { IEmployee, IActivity } from './../../definitions';
import { getUrlWithJsonExtension, prepareData } from './../../utils';
import { HttpProvider } from '../httpProvider';

type EmployeeResponce = Omit<IEmployee, 'id' | 'activity'> & {
  activity: {
    [id: string]: Omit<IActivity, 'id'>;
  };
};

interface IEmployeesResponce {
  [id: string]: EmployeeResponce;
}

class _EmployeesRepository {
  getAll(): Promise<IEmployee[]> {
    const url = getUrlWithJsonExtension(API.EMPLOYEES.LIST());

    return HttpProvider.get<IEmployeesResponce>(url).then((res) => {
      return prepareData(res).map((employee) => {
        return {
          ...employee,
          activity: prepareData(employee.activity),
        };
      });
    });
  }

  getById(id: IEmployee['id']): Promise<IEmployee> {
    const url = getUrlWithJsonExtension(API.EMPLOYEES.DETAIL(id));

    return HttpProvider.get<EmployeeResponce>(url).then((employee) => {
      return {
        ...employee,
        id,
        activity: prepareData(employee.activity),
      };
    });
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
