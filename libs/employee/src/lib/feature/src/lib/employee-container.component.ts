import { Component, DestroyRef, OnInit, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEmployeeComponent, EditEmployeeComponent, EmployeeListItemComponent } from '@manage-employees/employee/ui';
import { EmployeeFacade } from '@manage-employees/employee/data';
import { Employee } from '@manage-employees/shared/models';
import { ConfirmationDialogComponent } from '@manage-employees/confirmation-dialog';
import { SearchComponent } from '@manage-employees/shared/search';
import { ConfirmationModalService } from '@manage-employees/shared/services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { take } from 'rxjs';

@Component({
  selector: 'lib-employee-container',
  standalone: true,
  imports: [
    CommonModule,
    EmployeeListItemComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    ConfirmationDialogComponent,
    SearchComponent
  ],
  providers: [EmployeeFacade, ConfirmationModalService],
  templateUrl: './employee-container.component.html',
  styleUrl: './employee-container.component.scss',
})
export class EmployeeContainerComponent implements OnInit {
  private modalService = inject(ConfirmationModalService);
  private facade = inject(EmployeeFacade);
  private destroyRef = inject(DestroyRef);

  @ViewChild('confirmationModal', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  
  employees$ = this.facade.employees$;
  employee$ = this.facade.employee$;

  addEmployeeModalIsOpen = false;
  editEmployeeModalIsOpen = false;

  ngOnInit(): void {
    this.facade.getAll('');
  }

  setEmployee(employee: Employee): void {
    this.facade.setEmployee(employee);
  }

  saveNewEmployee(): void {
    this.facade.add();
    this.addEmployeeModalIsOpen = false;
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
    this.modalService.openModal(this.entry, 'Confirmation', 'Are you sure you want to delete the employee?')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.facade.delete(employee.id);
      });
  }

  search(searchValue: string): void {
    this.facade.getAll(searchValue);
  }

  export(): void {
    console.log('export');
    this.employees$.pipe(take(1)).subscribe((employees: Employee[]) => {
      
      const csv =  "data:text/csv;charset=utf-8," +  employees.map((employee: Employee) => {
        return `${employee.firstName} ${employee.lastName}, ${employee.position}`
      }).join('\n');
      console.log('export', csv);
      const encodedUri = encodeURI(csv);
      window.open(encodedUri);
    });
  }
}
