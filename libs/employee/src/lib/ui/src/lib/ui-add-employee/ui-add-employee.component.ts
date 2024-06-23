import { Component, DestroyRef, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Employee } from '@manage-employees/shared/models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'lib-ui-add-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ui-add-employee.component.html',
  styleUrl: './ui-add-employee.component.scss',
})
export class AddEmployeeComponent implements OnInit {
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() setNewEmployee = new EventEmitter<Employee>();
  @Output() saveNewEmployee = new EventEmitter<void>();

  private readonly formBuilder = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  form!: FormGroup;
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      position: ['', [Validators.required]],
      profilePicture: [''],
    });

    this.form.valueChanges.pipe(debounceTime(200), takeUntilDestroyed(this.destroyRef))
      .subscribe((formValue: Employee) => {
        if (this.form.valid) {
          this.setNewEmployee.emit(formValue);
        }
      });
  }

  save(): void {
    this.saveNewEmployee.emit();
  }

  close(): void {
    this.closeModal.emit();
  }
}

