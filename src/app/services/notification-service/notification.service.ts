import { Inject, Injectable} from '@angular/core';
import { ToastsManager } from 'ng2-toastr';

@Injectable()
export class NotificationService {

  constructor(@Inject('$translate') private translateService,
              public toastrService: ToastsManager) {
  }

  private translateMessage(message) {
    return this.translateService(message);
  }

  showSuccess(message: string) {
    this.translateMessage(message)
      .then(mess => {
        this.toastrService.success(mess, null);
      });
  }

  showError(message: string) {
    this.translateMessage(message)
      .then(mess => {
        this.toastrService.error(mess, null);
      });
  }

  showWarning(message: string) {
    this.translateMessage(message)
      .then(mess => {
        this.toastrService.warning(mess, null);
      });
  }

  showInfo(message: string) {
    this.translateMessage(message)
      .then(mess => {
        this.toastrService.info(mess, null);
      });
  }

}
