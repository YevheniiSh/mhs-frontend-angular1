import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Template } from '../template';

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
  @Output() save: EventEmitter<Template> = new EventEmitter();

  constructor(@Inject('$routeParams') private $routeParams,
              @Inject('$location') private $location,
              @Inject('gameTemplateServiceFactory') private templateService) {
  }

  ngOnInit() {
  }

  saveTemplate() {
    if (this.template.rounds.length < 2) {
      this.showRoundCountError();
    } else if (this.isNewTemplate) {
      this.createNewTemplate();
    } else {
      this.updateTemplate();
    }
  }

  createNewTemplate() {
    this.save.emit(this.template);
  }

  updateTemplate = function () {
    this.templateService.update(this.template.id, { name: this.template.name, rounds: this.template.rounds })
      .then(() => {
        this.showTemplateSavedMessage();
      });
  };

  showTemplateSavedMessage() {
    this.templateSaved = true;
    setTimeout(() => {
      this.templateSaved = false;
    }, 2000);
  }

  showRoundCountError() {
    this.roundCountError = true;
    setTimeout(() => {
      this.roundCountError = false;
    }, 2000);
  }
}
