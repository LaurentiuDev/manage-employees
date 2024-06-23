import { Component, DestroyRef, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Employee } from '@manage-employees/shared/models';

@Component({
  selector: 'lib-ui-edit-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ui-edit-employee.component.html',
  styleUrl: './ui-edit-employee.component.scss',
})
export class EditEmployeeComponent implements OnInit {
  @Input() employee: Employee | null = null;
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() setUpdatedEmployee = new EventEmitter<Employee>();
  @Output() saveUpdatedEmployee = new EventEmitter<void>();

  private readonly formBuilder = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  form!: FormGroup;
  
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: [this.employee?.firstName, [Validators.required]],
      lastName: [this.employee?.lastName, [Validators.required]],
      position: [this.employee?.position, [Validators.required]],
      profilePicture: [this.employee?.profilePicture],
    });

    this.form.valueChanges.pipe(debounceTime(200), takeUntilDestroyed(this.destroyRef))
      .subscribe((formValue: Employee) => {
        if (this.form.valid) {
          this.setUpdatedEmployee.emit({...formValue, id: this.employee?.id } as Employee);
        }
      });
  }

  save(): void {
    this.saveUpdatedEmployee.emit();
  }

  close(): void {
    this.closeModal.emit(false);
  }

  handleFileInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const file = files[0];
    this.form.value.profilePicture = file;
    this.saveFile(file);
  }

  saveFile(file: File) {
    const reader = new FileReader();

    reader.onloadend = () => {
      this.form.value.profilePicture = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}

