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

  file!: File;
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      position: ['', [Validators.required, Validators.minLength(2)]],
      profilePicture: [''],
    });

    this.form.valueChanges.pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef))
      .subscribe((formValue: Employee) => {
        if (this.form.valid) {
          this.setNewEmployee.emit(formValue);
        }
      });
  }

  save(): void {
    const reader = new FileReader();

    reader.onloadend = () => {
      this.setNewEmployee.emit({
        ...this.form.value, 
        profilePicture: reader.result as string
      } as Employee);
      this.saveNewEmployee.emit();
    };
    reader.readAsDataURL(this.file);
  }

  close(): void {
    this.closeModal.emit();
  }

  handleFileInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.file = files[0];
    this.setNewEmployee.emit({...this.form.value, profilePicture: this.file } as Employee);
  }
}

