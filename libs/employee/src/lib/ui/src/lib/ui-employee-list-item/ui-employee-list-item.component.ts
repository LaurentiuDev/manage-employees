import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '@manage-employees/shared/models';

@Component({
  selector: 'lib-ui-employee-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-employee-list-item.component.html',
  styleUrl: './ui-employee-list-item.component.scss',
})
export class EmployeeListItemComponent {
  @Input() employee!: Employee;
  @Output() openEditEmployeeModal = new EventEmitter();
  @Output() openDeleteEmployeeModal = new EventEmitter();
  
  openEditModal(): void {
    this.openEditEmployeeModal.emit(this.employee);
  }

  openDeleteModal(): void {
    this.openDeleteEmployeeModal.emit(this.employee);
  }
}
