import { ComponentRef, DestroyRef, Injectable, ViewContainerRef, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ConfirmationDialogComponent } from "@manage-employees/confirmation-dialog";
import { Subject } from "rxjs";

@Injectable()
export class ConfirmationModalService {
  private destroyRef = inject(DestroyRef);
  private componentRef!: ComponentRef<ConfirmationDialogComponent>;
  private componentSubscriber!: Subject<string>;

  openModal(entry: ViewContainerRef, modalTitle: string, modalBody: string) {
    this.componentRef = entry.createComponent(ConfirmationDialogComponent);
    this.componentRef.instance.title = modalTitle;
    this.componentRef.instance.body = modalBody;
    this.componentRef.instance.closeModal.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.closeModal());
    this.componentRef.instance.confirm.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.confirm());
    this.componentSubscriber = new Subject<string>();
    return this.componentSubscriber.asObservable();
  }

  closeModal() {
    this.componentSubscriber.complete();
    this.componentRef.destroy();
  }

  confirm() {
    this.componentSubscriber.next('confirm');
    this.closeModal();
  }
}
