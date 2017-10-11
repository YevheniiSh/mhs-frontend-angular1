import { Component, Inject, Input, OnInit } from '@angular/core';
import { Template } from '../template';
import { NotificationService } from '../../../services/notification-service/notification.service';
import { Downgrade } from '../../../hybrid/downgrade';

@Downgrade()
@Component({
  selector: 'mhs-current-template',
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
              private notificationService: NotificationService) {
  }

  ngOnInit() {
  }

  saveTemplate() {
    if (this.template.rounds.length < 2) {
      this.notificationService.showError('FEW_ROUNDS_ERROR');
    } else if (this.isNewTemplate) {
      this.createNewTemplate();
    } else {
      this.updateTemplate();
    }
  }

  createNewTemplate() {
    this.templateService.createTemplate(this.template).then((res) => {
      if (res) {
        this.notificationService.showSuccess('TEMPLATE_SAVED_MESSAGE');
        this.$location.path(`/templates/${res.$id}`);
      } else {
        this.notificationService.showError('TEMPLATE_NAME_EXIST_ERROR');
      }
    });
  }

  updateTemplate = function () {
    this.templateService.update(this.template.id, { name: this.template.name, rounds: this.template.rounds })
      .then((res) => {
        if (res) {
          this.notificationService.showSuccess('TEMPLATE_SAVED_MESSAGE');

        } else {
          this.notificationService.showError('TEMPLATE_NAME_EXIST_ERROR');
        }
      });
  };
}
