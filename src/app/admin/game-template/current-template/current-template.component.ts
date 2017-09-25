import { Component, Inject, Input, OnInit } from '@angular/core';
import { Template } from '../template';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-current-template',
  templateUrl: './current-template.component.html',
  styleUrls: ['./current-template.component.css']
})
export class CurrentTemplateComponent implements OnInit {
  roundCountError;
  templateSaved;
  name;
  @Input() template: Template;
  @Input() templateId: string;
  @Input() isNewTemplate: boolean;

  constructor(@Inject('$routeParams') private $routeParams,
              @Inject('$location') private $location,
              @Inject('gameTemplateServiceFactory') private templateService,
              @Inject('$translate') private $translate,
              private toastsManager: ToastsManager) {
  }

  ngOnInit() {
  }

  saveTemplate() {
    if (this.template.rounds.length < 2) {
      this.showTemplateErrorMessage('FEW_ROUNDS_ERROR');
    } else if (this.isNewTemplate) {
      this.createTemplate();
    } else {
      this.updateTemplate();
    }
  }

  createTemplate() {
    this.templateService.save(this.template.name, this.template.rounds).then((res) => {
      this.templateId = res.$id;
      this.template.id = res.$id;
      this.isNewTemplate = false;
      this.$location.path(`/templates/${ this.template.id }`);
    });
  }

  updateTemplate = function () {
    this.templateService.update(this.template.id, { name: this.template.name, rounds: this.template.rounds })
      .then(() => {
        this.showTemplateSavedMessage('TEMPLATE_SAVED_MESSAGE');
      });
  };

  showTemplateSavedMessage(message) {
        const config = {showCloseButton: true, toastLife: 2000};
        this.$translate(message)
          .then((mess) => {
            this.toastsManager.success(mess, '', config);
          });
  }

  showTemplateErrorMessage(message) {
    const config = {showCloseButton: true, toastLife: 2000};
    this.$translate(message)
      .then((mess) => {
        this.toastsManager.error(mess, '', config);
      });
  }
}
