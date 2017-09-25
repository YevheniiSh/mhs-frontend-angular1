import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Component, Input, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'notification',
  templateUrl: 'notification.component.html'
})
export class NotificationComponent {

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }
}
