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
      this.createNewTemplate();
    } else {
      this.updateTemplate();
    }
  }

  createNewTemplate() {
    this.templateService.createTemplate(this.template).then((res) => {
      if (res) {
        this.showTemplateSavedMessage('TEMPLATE_SAVED_MESSAGE');
        this.$location.path(`/templates/${res.$id}`);
      } else {
        this.showTemplateErrorMessage('ROUND_NAME_EXIST_ERROR');
      }
    });
  }

  updateTemplate = function () {
    this.templateService.update(this.template.id, { name: this.template.name, rounds: this.template.rounds })
      .then((res) => {
        if (res) {
          this.showTemplateSavedMessage('TEMPLATE_SAVED_MESSAGE');

        } else {
          this.showTemplateErrorMessage('ROUND_NAME_EXIST_ERROR');
        }
      });
  };

  showTemplateSavedMessage(message) {
    const config = { showCloseButton: true, toastLife: 2000 };
    this.$translate(message)
      .then((mess) => {
        this.toastsManager.success(mess, '', config);
      });
  }

  showTemplateErrorMessage(message) {
    const config = { showCloseButton: true, toastLife: 2000 };
    this.$translate(message)
      .then((mess) => {
        this.toastsManager.error(mess, '', config);
      });
  }
}
