import { createReducer, on } from "@ngrx/store";
import { initialEmployeeState } from "./employee.state";
import { EmployeeActions } from "./action-types";

export const employeeReducer = createReducer(
  initialEmployeeState,
  on(EmployeeActions.setEmployee, (state, { employee }) => ({
    ...state,
    employee
  })),
  on(EmployeeActions.getEmployees, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(EmployeeActions.getEmployeesSuccess, (state, { employees }) => ({
    ...state,
    employees,
    loading: false,
    loaded: true,
    error: null
  })),
  on(EmployeeActions.getEmployeesFailed, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error
  })),
  on(EmployeeActions.addEmployee, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(EmployeeActions.addEmployeeSuccess, (state, { employee }) => ({
    ...state,
    employees: [...state.employees, employee],
    loading: false,
    loaded: true,
    error: null
  })),
  on(EmployeeActions.addEmployeeFailed, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error
  })),
  on(EmployeeActions.updateEmployee, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(EmployeeActions.updateEmployeeSuccess, (state, { employee }) => ({
    ...state,
    employees: state.employees.map((e) => e.id !== employee.id ? e : employee),
    loading: false,
    loaded: true,
    error: null
  })),
  on(EmployeeActions.updateEmployeeFailed, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error
  })),
  on(EmployeeActions.deleteEmployee, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(EmployeeActions.deleteEmployeeSuccess, (state, { id }) => ({
    ...state,
    employees: state.employees.filter((e) => e.id !== id),
    loading: false,
    loaded: true,
    error: null
  })),
  on(EmployeeActions.deleteEmployeeFailed, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error
  })),
);
