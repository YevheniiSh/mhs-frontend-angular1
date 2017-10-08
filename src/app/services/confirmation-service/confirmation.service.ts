import { Injectable } from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../../admin/confirm/confirm.component';
import { Downgrade } from '../../hybrid/downgrade-component';

const options = { closeByClickingOutside: true, backdropColor: 'rgba(0,0,0,0.5)' };

@Injectable()
@Downgrade()
export class CustomConfirmationService {

  constructor(private confirmation: DialogService) {
  }

  public create(title: string, message: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.confirmation.addDialog(ConfirmComponent, { title, message }, options)
        .subscribe((ans) => {
          (ans) ? resolve(ans) : reject(ans);
        });
    });
  }
}
