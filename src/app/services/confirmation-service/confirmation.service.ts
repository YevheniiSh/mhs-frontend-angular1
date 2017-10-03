import {Inject, Injectable} from '@angular/core';
import {DialogService} from 'ng2-bootstrap-modal';
import {ConfirmComponent} from "../../admin/confirm/confirm.component";


@Injectable()
export class CustomConfirmationService {

  constructor(@Inject('$translate') private translateService,
              private confirmation: DialogService) {
  }

  public create(title: string, message: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.confirmation.addDialog(ConfirmComponent, {
        title: title,
        message: message
              }, { closeByClickingOutside: true }).subscribe((ans) => {
                resolve(ans);
              });
            });
  }
}
