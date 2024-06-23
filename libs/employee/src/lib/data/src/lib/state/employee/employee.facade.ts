import { Injectable, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { EmployeeActions } from "./action-types";
import { selectEmployee, selectEmployees } from "./employee.selectors";
import { Employee } from "@manage-employees/shared/models";

@Injectable()
export class EmployeeFacade {
  private store = inject(Store);

  employees$ = this.store.select(selectEmployees);
  employee$ = this.store.select(selectEmployee);

  setEmployee(employee: Employee): void {
    this.store.dispatch(EmployeeActions.setEmployee({ employee }));
  }

  getAll(): void {
    this.store.dispatch(EmployeeActions.getEmployees());
  }

  add(): void {
    this.store.dispatch(EmployeeActions.addEmployee());
  }

  update(): void {
    this.store.dispatch(EmployeeActions.updateEmployee());
  }

  delete(id: string): void {
    this.store.dispatch(EmployeeActions.deleteEmployee({ id }));
  }
}
