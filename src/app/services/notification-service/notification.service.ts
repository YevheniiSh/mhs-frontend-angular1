import { Inject, Injectable, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';

@Injectable()
export class NotificationService {

  constructor(@Inject('$translate') private translateService,
              private toastrService: ToastsManager,
              private viewContainerRef: ViewContainerRef) {
    this.toastrService.setRootViewContainerRef(this.viewContainerRef);
  }

  showSuccess(message: string) {
    this.toastrService.success(message, '', {showCloseButton: true, toastLife: 2000});
  }

}
