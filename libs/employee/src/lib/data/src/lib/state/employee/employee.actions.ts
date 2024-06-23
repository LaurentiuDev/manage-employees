import { createAction, props } from '@ngrx/store';
import { Employee } from '@manage-employees/shared/models';

export const setEmployee = createAction(
  '[Employee Components] Set Employee',
  props<{ employee: Employee }>()
);

export const getEmployees = createAction(
  '[Employee Components] Get Employees',
  props<{ searchValue: string }>()
);

export const getEmployeesSuccess = createAction(
  '[Employee API] Get Employees Success',
  props<{ employees: Employee[] }>()
);

export const getEmployeesFailed = createAction(
  '[Employee API] Get Employees Failed',
  props<{ error: string | null }>()
);

export const addEmployee = createAction(
  '[Employee Components] Add Employee'
);

export const addEmployeeSuccess = createAction(
  '[Employee API] Add Employee Success',
  props<{ employee: Employee }>()
);

export const addEmployeeFailed = createAction(
  '[Employee API] Add Employee Failed',
  props<{ error: string | null }>()
);

export const updateEmployee = createAction(
  '[Employee Components] Update Employee'
);

export const updateEmployeeSuccess = createAction(
  '[Employee API] Update Employee Success',
  props<{ employee: Employee }>()
);

export const updateEmployeeFailed = createAction(
  '[Employee API] Update Employee Failed',
  props<{ error: string | null }>()
);

export const deleteEmployee = createAction('[Employee Components] Delete Employee', props<{ id: string }>());

export const deleteEmployeeSuccess = createAction(
  '[Employee API] Delete Employee Success',
  props<{ id: string }>()
);

export const deleteEmployeeFailed = createAction(
  '[Employee API] Update Employee Failed',
  props<{ error: string | null }>()
);
