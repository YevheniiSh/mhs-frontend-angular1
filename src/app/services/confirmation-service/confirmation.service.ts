import { Inject, Injectable } from '@angular/core';
import { ConfirmationService } from '@jaspero/ng2-confirmations';
import { ResolveEmit } from '@jaspero/ng2-confirmations/src/interfaces/resolve-emit';


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
              private confirmation: ConfirmationService) {
  }

  public create(text: string): Promise<ResolveEmit> {
    return new Promise((resolve, reject) => {
      this.translateButtons()
        .then(() => {
          this.translateMessage(text)
            .then((t) => {
              this.confirmation.create('', t, this.options).subscribe((ans: ResolveEmit) => {
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
