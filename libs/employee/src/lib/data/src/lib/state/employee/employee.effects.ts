import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LocalStorageService } from '../../services/local-storage.service';
import { EmployeeActions } from './action-types';
import { catchError, exhaustMap, map, mergeMap, of, withLatestFrom } from 'rxjs';
import { Employee } from '@manage-employees/shared/models';
import { Store } from '@ngrx/store';
import { selectEmployee } from './employee.selectors';

@Injectable()
export class EmployeeEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private localStorageService = inject(LocalStorageService<Employee>);

  getEmployees$ = createEffect(() => 
    this.actions$.pipe(
      ofType(EmployeeActions.getEmployees),
      mergeMap(() =>
        this.localStorageService.getAll('employees').pipe(
          map((employees: Employee[]) => EmployeeActions.getEmployeesSuccess({ employees })),
          catchError((error: string | null) => of(EmployeeActions.getEmployeesFailed({ error })))
        )
      )
    )
  )

  addEmployee$ = createEffect(() => 
    this.actions$.pipe(
      ofType(EmployeeActions.addEmployee),
      withLatestFrom(this.store.select(selectEmployee)),
      exhaustMap(([, newEmployee]) =>
        this.localStorageService.add('employees', newEmployee).pipe(
          map((employee: Employee) => EmployeeActions.addEmployeeSuccess({ employee })),
          catchError((error: string | null) => of(EmployeeActions.addEmployeeFailed({ error })))
        )
      )
    )
  )

  updateEmployee$ = createEffect(() => 
    this.actions$.pipe(
      ofType(EmployeeActions.updateEmployee),
      withLatestFrom(this.store.select(selectEmployee)),
      exhaustMap(([, updatedEmployee]) =>
        this.localStorageService.update('employees', updatedEmployee).pipe(
          map((employee: Employee) => EmployeeActions.updateEmployeeSuccess({ employee })),
          catchError((error: string | null) => of(EmployeeActions.updateEmployeeFailed({ error })))
        )
      )
    )
  )

  deleteEmployee$ = createEffect(() => 
    this.actions$.pipe(
      ofType(EmployeeActions.deleteEmployee),
      exhaustMap((action) => 
        this.localStorageService.delete('employees', action.id).pipe(
          map((id: string) => EmployeeActions.deleteEmployeeSuccess({ id })),
          catchError((error: string | null) => of(EmployeeActions.deleteEmployeeFailed({ error })))
        )
      )
    )
  )
}
