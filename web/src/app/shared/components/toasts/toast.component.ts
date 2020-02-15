import {Component, TemplateRef} from '@angular/core';
import {ToastService} from './toast.service';

@Component({
  selector: 'app-toasts',
  template: `
    <ngb-toast
      *ngFor="let toast of toastService.toasts"
      [header]="toast.headertext"
      [class]="toast.classname"
      [autohide]="toast.autohide"
      [delay]="toast.delay || 5000"
      (hide)="toastService.remove(toast)"
    >
      <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
        <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
      </ng-template>

      <ng-template #text>
      <i *ngIf="toast.classname?.indexOf( 'primary' )>0" class="fas fa-dot-circle"></i>
      <i *ngIf="toast.classname?.indexOf( 'secondary' )>0" class="fas fa-stop-circle"></i>
      <i *ngIf="toast.classname?.indexOf( 'success' )>0" class="fas fa-check-circle"></i>
      <i *ngIf="toast.classname?.indexOf( 'danger' )>0" class="fas fa-times-circle"></i>
      <i *ngIf="toast.classname?.indexOf( 'warning' )>0" class="fas fa-exclamation-circle"></i>
      <i *ngIf="toast.classname?.indexOf( 'info' )>0" class="fas fa-info-circle"></i>

      {{ toast.textOrTpl }}
      </ng-template>
    </ngb-toast>
  `,
  // tslint:disable-next-line: no-host-metadata-property
  host: {'[class.ngb-toasts]': 'true'}
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}

  isTemplate( toast ) { return toast.textOrTpl instanceof TemplateRef; }
}
