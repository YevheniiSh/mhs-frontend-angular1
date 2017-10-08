import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { Downgrade } from '../../hybrid/downgrade-component';

export interface ConfirmModel {
  title: string;
  message: string;
}

@Component({
  selector: 'app-confirm-component',
  templateUrl: './confirm.component.html'
})
@Downgrade()
export class ConfirmComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  message: string;

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  confirm() {
    this.result = true;
    this.close();
  }

  cancel() {
    this.result = false;
    this.close();
  }

}
