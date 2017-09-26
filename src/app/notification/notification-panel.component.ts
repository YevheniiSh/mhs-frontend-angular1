import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Component, Input, ViewContainerRef } from '@angular/core';

//Todo change selector

@Component({
  selector: 'notification-panel',
  templateUrl: 'notification-panel.component.html'
})
export class NotificationPanelComponent {

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }
}
