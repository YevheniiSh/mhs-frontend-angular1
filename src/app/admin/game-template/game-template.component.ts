import { Component, Inject, OnInit } from '@angular/core';
import { Template } from './template';

@Component({
  selector: 'app-game-template',
  templateUrl: './game-template.component.html',
  styleUrls: ['./game-template.component.css']
})
export class GameTemplateComponent implements OnInit {
  private templateId: string;
  template: Template;
  templates: Template[];
  isNewTemplate: boolean;

  constructor(@Inject('$routeParams') private $routeParams,
              @Inject('$location') private $location,
              @Inject('gameTemplateServiceFactory') private templateService) {
    if ($routeParams.hasOwnProperty('templateId')) {
      this.templateId = $routeParams.templateId;
      this.getTemplate();
    }
  }

  ngOnInit() {
    this.templateService.getAll().then((res) => {
      this.templates = res;
    });
  }

  showTemplate(templateId) {
    this.templateId = templateId;
    this.$location.path(`/templates/${templateId}`);
    this.getTemplate();
  }

  getTemplate() {
    this.template = new Template();
    this.templateService.getById(this.templateId).then(template => {
      this.template.name = template.name;
      this.template.rounds = template.rounds.slice(1, template.rounds.length); // first round is undefined!
      this.template.id = this.templateId;
    });
  }

  newTemplate() {
    this.templateId = '';
    this.isNewTemplate = true;
    this.template = new Template();
    this.template.rounds = [];
  }

  deleteTemplate(templateId) {
    this.templateService.remove(templateId);
    if (this.$routeParams.templateId === templateId) {
      this.$location.path(`/templates`);
    }
  }
}
