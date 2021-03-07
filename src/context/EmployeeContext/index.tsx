import React from 'react';
import { Button } from 'antd';
import { Loader } from '../../components/Loader';
import { ServerError } from '../../components/ServerError';
import { IEmployee } from '../../definitions';
import { EmployeesRepository } from '../../services/repositories';
import { IEmployeeContext, IState } from './types';
import styles from './styles.module.scss';

const EMPLOYEE_ID_LOCAL_STORAGE_KEY = 'EMPLOYEE_ID';

export const EmployeeContext = React.createContext<IEmployeeContext>({} as IEmployeeContext);

export class EmployeeContextProvider extends React.Component<{}, IState> {
  state: IState = {
    employee: null,
    loading: true,
  };

  componentDidMount() {
    const id = this.getEmployeeId();

    if (!id) {
      this.stopLoading();
      return;
    }

    EmployeesRepository.getById(id)
      .then((employee) => {
        if (!employee?.idToken) {
          return;
        }

        this.setEmployee(employee);
      })
      .finally(() => this.stopLoading());
  }

  stopLoading = () => {
    this.setState({
      loading: false,
    });
  };

  setEmployee = (employee: IState['employee']) => {
    this.setState({ employee });

    if (employee) {
      this.saveId(employee.id);
      return;
    }

    this.saveId(null);
  };

  saveId(id: IEmployee['id'] | null) {
    localStorage.setItem(EMPLOYEE_ID_LOCAL_STORAGE_KEY, JSON.stringify(id));
  }

  getEmployeeId(): IEmployee['id'] | null {
    const id = localStorage.getItem(EMPLOYEE_ID_LOCAL_STORAGE_KEY);

    if (!id) {
      return null;
    }

    return JSON.parse(id);
  }

  getValues(): IEmployeeContext {
    return {
      employee: this.state.employee,
      setEmployee: this.setEmployee,
    };
  }

  onReload = () => {
    this.saveId(null);
    window.location.reload();
  };

  getContextProvider() {
    return (
      <EmployeeContext.Provider value={this.getValues()}>
        {this.props.children}
      </EmployeeContext.Provider>
    );
  }

  getServerError() {
    const extra = (
      <Button type='primary' onClick={this.onReload}>
        Reload the page
      </Button>
    );

    return <ServerError extra={extra} />;
  }

  getLoader() {
    return (
      <div className={styles.wrap}>
        <Loader />
      </div>
    );
  }

  render() {
    const employeeId = this.getEmployeeId();

    if (!employeeId) {
      return this.getContextProvider();
    }

    if (this.state.loading) {
      return this.getLoader();
    }

    if (!this.state.employee) {
      return this.getServerError();
    }

    return this.getContextProvider();
  }
}
