import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-confirmation-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss',
})
export class ConfirmationDialogComponent {
  @Input() title = '';
  @Input() body = '';
  @Output() confirm = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  submit(): void {
    this.confirm.emit();
  }

  close(): void {
    this.closeModal.emit();
  }
}
