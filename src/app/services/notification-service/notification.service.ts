import { Injectable } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { Downgrade } from '../../hybrid/downgrade';
import { TranslateService } from '../translate-service/translate.service.upgrade';

@Downgrade()
@Injectable()
export class NotificationService {

  private config = { showCloseButton: true, toastLife: 2000 };

  constructor(private translateService: TranslateService, public toastrService: ToastsManager) {
  }

  showSuccess(message: string) {
    this.translateService.translateMessage(message)
      .then(mess => {
        this.toastrService.success(mess, '', this.config);
      });
  }

  showError(message: string) {
    this.translateService.translateMessage(message)
      .then(mess => {
        this.toastrService.error(mess, '', this.config);
      });
  }

  showWarning(message: string) {
    this.translateService.translateMessage(message)
      .then(mess => {
        this.toastrService.warning(mess, '', this.config);
      });
  }

  showInfo(message: string) {
    this.translateService.translateMessage(message)
      .then(mess => {
        this.toastrService.info(mess, '', this.config);
      });
  }

}
