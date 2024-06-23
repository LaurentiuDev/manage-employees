import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-confirmation-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss',
})
export class ConfirmationDialogComponent {
  @Output() confirm = new EventEmitter();
  @Output() closeModal = new EventEmitter();

  submit(): void {
    this.confirm.emit();
  }

  close(): void {
    this.closeModal.emit();
  }
}