import React from 'react';
import { IEmployeeContext, IState } from './types';

const EMPLOYEE_LOCAL_STORAGE_KEY = 'employee';

export const EmployeeContext = React.createContext<IEmployeeContext>({} as IEmployeeContext);

export class EmployeeContextProvider extends React.Component<{}, IState> {
  state: IState = {
    employee: null,
  };

  componentDidMount() {
    const employee = localStorage.getItem(EMPLOYEE_LOCAL_STORAGE_KEY);

    if (employee) {
      this.setState({
        employee: JSON.parse(employee),
      });
    }
  }

  setEmployee = (employee: IState['employee']) => {
    this.setState({ employee });
    localStorage.setItem(EMPLOYEE_LOCAL_STORAGE_KEY, JSON.stringify(employee));
  };

  getValues(): IEmployeeContext {
    return {
      employee: this.state.employee,
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
