import {Component} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";

export interface ConfirmModel {
  title: string;
  message: string;
}

@Component({
  selector: 'app-confirm-component',
  templateUrl: './confirm.component.html'
})
export class ConfirmComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  message: string;

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  confirm() {
    // on click on confirm button we set dialog result as true,
    // ten we can get dialog result from caller code
    this.result = true;
    this.close();
  }

  cancel() {
    this.result = false;
    this.close();
  }

}
