import { Injectable } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { Downgrade } from '../../hybrid/downgrade';
import { TranslateService } from '@ngx-translate/core';


@Downgrade()
@Injectable()
export class NotificationService {

  constructor(private translateService: TranslateService, public toastrService: ToastsManager) {}

  showSuccess(message: string) {
    this.translateService.get(message).toPromise()
      .then(mess => {
        this.toastrService.success(mess, '');
      });
  }

  showError(message: string) {
    this.translateService.get(message).toPromise()
      .then(mess => {
        this.toastrService.error(mess, '');
      });
  }

  showWarning(message: string) {
    this.translateService.get(message).toPromise()
      .then(mess => {
        this.toastrService.warning(mess, '');
      });
  }

  showInfo(message: string) {
    this.translateService.get(message).toPromise()
      .then(mess => {
        this.toastrService.info(mess, '');
      });
  }

  showControlledWarning(message: string) {
    const toastrConfif = {showCloseButton: false, dismiss: 'controlled'};
    return this.translateService.get(message)
      .switchMap(mess => this.toastrService.warning(mess, '', toastrConfif));
  }

}
