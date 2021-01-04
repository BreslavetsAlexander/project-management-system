import React from 'react';
import { IEmployeeContext, IState } from './types';

const EMPLOYEE_LOCAL_STORAGE_KEY = 'employee';

export const EmployeeContext = React.createContext<IEmployeeContext>({} as IEmployeeContext);

export class EmployeeContextProvider extends React.Component<{}, IState> {
  state: IState = {
    employee: null,
  };

  componentDidMount() {
    this.setState({
      employee: this.getEmployee(),
    });
  }

  setEmployee = (employee: IState['employee']) => {
    this.setState({ employee });
    localStorage.setItem(EMPLOYEE_LOCAL_STORAGE_KEY, JSON.stringify(employee));
  };

  getEmployee(): IState['employee'] {
    const employee = localStorage.getItem(EMPLOYEE_LOCAL_STORAGE_KEY);

    if (!employee) {
      return null;
    }

    return JSON.parse(employee);
  }

  getValues(): IEmployeeContext {
    return {
      employee: this.getEmployee(),
      setEmployee: this.setEmployee,
    };
  }

  render() {
    return (
      <EmployeeContext.Provider value={this.getValues()}>
        {this.props.children}
      </EmployeeContext.Provider>
    );
  }
}
