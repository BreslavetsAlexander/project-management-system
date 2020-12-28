import React from 'react';
import { IEmployeeContext } from './types';

export const EmployeeContext = React.createContext<IEmployeeContext>({
  employee: null,
});

export class EmployeeContextProvider extends React.Component {
  render() {
    return (
      <EmployeeContext.Provider value={{ employee: null }}>
        {this.props.children}
      </EmployeeContext.Provider>
    );
  }
}
