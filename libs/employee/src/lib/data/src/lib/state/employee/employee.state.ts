import { Employee } from "@manage-employees/shared/models";

export const EMPLOYEES_FEATURE_KEY = 'employees';

export interface EmployeeState {
  employees: Employee[];
  employee: Employee | null;
  loading: boolean;
  loaded: boolean;
  error: string | null;
}

export const initialEmployeeState: EmployeeState = {
  employees: [],
  employee: null,
  loading: false,
  loaded: false,
  error: null
}
