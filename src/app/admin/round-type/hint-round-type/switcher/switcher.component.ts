import { Component, EventEmitter, Inject, Input, OnChanges, Output, SimpleChange } from '@angular/core';
import { trigger } from '@angular/animations';

@Component({
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.css'],
  animations: [
    trigger('myRadio', [])]
})
export class SwitcherComponent implements OnChanges {


  @Input() result;
  @Input() index;
  @Input() weight;
  @Input() previousQuizResults;

  @Output() saved = new EventEmitter<any>();
  clearResult = function (result) {
    result.checked = 0;
    const resultKey = [result.round, result.quiz, result.teamId].join('_');
    this.resultServiceFactory.deleteResult(this.routeParams.gameId, resultKey);
  };

  constructor(@Inject('$routeParams') private routeParams,
              @Inject('ResultServiceFactory') private resultServiceFactory) {
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }): void {
    for (let propName in changes) {
      if (propName === 'previousQuizResults' && changes[propName].currentValue !== undefined) {
        this.setDisableStatuses();
      }
    }
  }

  saveResult(result) {
    this.saved.emit(result);
  }

  setDisableStatuses() {
    if (!this.isFirstQuiz()) {
      this.setInputDisableStatus(this.result);
    }
  }

  isFirstQuiz() {
    return this.routeParams.quizNumber === '1';
  }

  private setInputDisableStatus(result) {
    if (this.isTeamAnsweredInRound(result) && this.isTeamAnsweredToPreviousQuestion(result)) {
      this.disableInput(result);
    }
  }

  private isTeamAnsweredInRound(result) {
    return this.previousQuizResults[result.teamId] !== undefined;
  }

  private isTeamAnsweredToPreviousQuestion(result) {
    return this.previousQuizResults[result.teamId].quizNumber < (+this.routeParams.quizNumber);
  }

  private disableInput(result) {
    if (this.isPreviousAnswerCorrect(result)) {
      this.setSwitcherScoreOn(result);
    } else {
      this.setSwitcherScoreOff(result);
    }
    result.disabled = true;
  }

  private isPreviousAnswerCorrect(result) {
    return this.previousQuizResults[result.teamId].score > 0;
  }

  private setSwitcherScoreOn(result) {
    result.score = this.weight;
  }

  private setSwitcherScoreOff(result) {
    result.score = -1;
  }

}
