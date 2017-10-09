import { Inject, Injectable } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { Downgrade } from '../../hybrid/downgrade';

@Injectable()
@Downgrade()
export class NotificationService {

  private config = { showCloseButton: true, toastLife: 2000 };

  constructor(@Inject('$translate') private translateService,
              public toastrService: ToastsManager) {
  }

  private translateMessage(message) {
    return this.translateService(message);
  }

  showSuccess(message: string) {
    this.translateMessage(message)
      .then(mess => {
        this.toastrService.success(mess, '', this.config);
      });
  }

  showError(message: string) {
    this.translateMessage(message)
      .then(mess => {
        this.toastrService.error(mess, '', this.config);
      });
  }

  showWarning(message: string) {
    this.translateMessage(message)
      .then(mess => {
        this.toastrService.warning(mess, '', this.config);
      });
  }

  showInfo(message: string) {
    this.translateMessage(message)
      .then(mess => {
        this.toastrService.info(mess, '', this.config);
      });
  }

}
