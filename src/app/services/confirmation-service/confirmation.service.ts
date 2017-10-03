import { Inject, Injectable } from '@angular/core';
import { ResolveEmit } from '@jaspero/ng2-confirmations/src/interfaces/resolve-emit';
import { DialogService } from 'ng2-bootstrap-modal';
import { ConfirmComponentComponent } from '../../admin/confirm-component/confirm-component.component';


@Injectable()
export class CustomConfirmationService {
  private options = {
    overlay: true,
    overlayClickToClose: true,
    showCloseButton: true,
    confirmText: 'Yes',
    declineText: 'No'
  };

  constructor(@Inject('$translate') private translateService,
              private confirmation: DialogService) {
  }

  public create(text: string): Promise<ResolveEmit> {
    return new Promise((resolve, reject) => {
      this.translateButtons()
        .then(() => {
          this.translateMessage(text)
            .then((t) => {
              this.confirmation.addDialog(ConfirmComponentComponent, {
                title: '',
                message: t
              }, { closeByClickingOutside: true }).subscribe((ans) => {
                resolve(ans);
              });
            });
        });
    });
  }

  private translateButtons(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.translateMessage('CONFIRMATION_CONFIRM_TEXT')
        .then((text) => {
          this.options.confirmText = text;
        })
        .then(() => {
          this.translateMessage('CONFIRMATION_DECLINE_TEXT')
            .then((text) => {
              this.options.declineText = text;
              resolve('translated');
            });
        });
    });
  }

  private translateMessage(message) {
    return this.translateService(message);
  }
}
