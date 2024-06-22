import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiEmployeeComponent } from '@manage-employees/employee/ui';

@Component({
  selector: 'lib-employee-container',
  standalone: true,
  imports: [CommonModule, UiEmployeeComponent],
  templateUrl: './employee-container.component.html',
  styleUrl: './employee-container.component.scss',
})
export class EmployeeContainerComponent {}
