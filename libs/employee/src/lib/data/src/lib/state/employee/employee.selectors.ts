import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EMPLOYEES_FEATURE_KEY, EmployeeState } from "./employee.state";

export const selectEmployeeState = createFeatureSelector<EmployeeState>(EMPLOYEES_FEATURE_KEY);

export const selectEmployees = createSelector(selectEmployeeState, (state: EmployeeState) => state.employees);

export const selectEmployee = createSelector(selectEmployeeState, (state: EmployeeState) => state.employee);
