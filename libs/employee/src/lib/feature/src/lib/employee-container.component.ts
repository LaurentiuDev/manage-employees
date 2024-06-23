import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEmployeeComponent, EditEmployeeComponent, EmployeeListItemComponent } from '@manage-employees/employee/ui';
import { EmployeeFacade } from '@manage-employees/employee/data';
import { Employee } from '@manage-employees/shared/models';
import { ConfirmationDialogComponent } from '@manage-employees/confirmation-dialog';

@Component({
  selector: 'lib-employee-container',
  standalone: true,
  imports: [
    CommonModule,
    EmployeeListItemComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    ConfirmationDialogComponent
  ],
  providers: [EmployeeFacade],
  templateUrl: './employee-container.component.html',
  styleUrl: './employee-container.component.scss',
})
export class EmployeeContainerComponent implements OnInit {
  private facade = inject(EmployeeFacade);
  
  employees$ = this.facade.employees$;
  employee$ = this.facade.employee$;
  employeeId = '';

  addEmployeeModalIsOpen = false;
  editEmployeeModalIsOpen = false;
  confirmationModalIsOpen = false;

  ngOnInit(): void {
    this.facade.getAll();
  }

  setEmployee(employee: Employee): void {
    this.facade.setEmployee(employee);
  }

  saveNewEmployee(): void {
    this.facade.add();
  }

  openAddEmployeeModal(): void {
    this.addEmployeeModalIsOpen = true;
  }

  closeAddEmployeeModal(): void {
    this.addEmployeeModalIsOpen = false;
  }

  saveUpdatedEmployee(): void {
    this.facade.update();
    this.editEmployeeModalIsOpen = false;
  }

  openEditEmployeeModal(employee: Employee): void {
    this.editEmployeeModalIsOpen = true;
    this.facade.setEmployee(employee);
  }

  closeEditEmployeeModal(): void {
    this.editEmployeeModalIsOpen = false;
  }

  openDeleteEmployeeModal(employee: Employee): void {
    this.employeeId = employee.id
    this.confirmationModalIsOpen = true;
  }

  deleteEmployee(): void {
    this.facade.delete(this.employeeId);
    this.confirmationModalIsOpen = false; 
  }

  closeConfirmationModal(): void {
    this.confirmationModalIsOpen = false; 
  }
}
