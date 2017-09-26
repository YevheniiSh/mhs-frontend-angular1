import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Component, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'notification-panel',
  templateUrl: 'notification-panel.component.html'
})
export class NotificationPanelComponent {

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }
}
