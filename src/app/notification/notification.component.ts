import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Component, Input, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-notification',
  template: '<button class="btn btn-default" (click)="showSuccess()">Toastr Tester</button>'
})
export class NotificationComponent {

  @Input() message;
  @Input() type;
  @Input() show;

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  showSuccess() {
    this.toastr.success('You are awesome!', 'Success!');
  }

  showError() {
    this.toastr.error('This is not good!', 'Oops!');
  }

  showWarning() {
    this.toastr.warning('You are being warned.', 'Alert!');
  }

  showInfo() {
    this.toastr.info('Just some information for you.');
  }

  showCustom() {
    this.toastr.custom('<span style="color: red">Message in red.</span>', null, {enableHTML: true});
  }
}
