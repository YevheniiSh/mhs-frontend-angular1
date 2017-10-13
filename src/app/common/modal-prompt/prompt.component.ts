import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

export interface PromptModel {
  title: string;
  question: string;
}

@Component({
  selector: 'mhs-prompt',
  templateUrl: 'prompt.component.html',
  styleUrls: ['prompt.component.css'],
})
export class PromptComponent extends DialogComponent<PromptModel, string> implements PromptModel {
  title: string;
  question: string;
  message = '';

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  apply() {
    this.result = this.message;
    super.close();
  }
}
