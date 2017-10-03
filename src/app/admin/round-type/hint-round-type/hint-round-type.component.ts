import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-hint-round-type',
  templateUrl: './hint-round-type.component.html',
  styleUrls: ['./hint-round-type.component.css']
})
export class HintRoundTypeComponent implements OnInit {

  step;
  weight;
  previousQuizResults;
  @Input() results;
  @Output() saved = new EventEmitter<any>();
  clearResult = function (result) {
    result.checked = 1;
    const resultKey = [result.round, result.quiz, result.teamId].join('_');
    this.resultServiceFactory.deleteResult(this.routeParams.gameId, resultKey);
  };

  constructor(@Inject('GameServiceFactory') private gameServiceFactory,
              @Inject('$routeParams') private routeParams,
              @Inject('ResultServiceFactory') private resultServiceFactory) {

  }

  ngOnInit() {
    this.getRound()
      .then((round) => {
        this.getQuizWeight(round);
      })
      .then(() => {
        return this.initPreviousQuizResults();
      })
      .then(() => {
        this.setDisableStatuses();
      });
  }

  getRound() {
    return this.gameServiceFactory.getRoundByGameAndId(this.routeParams.gameId, this.routeParams.roundNumber);
  }

  getQuizWeight(round) {
    this.step = round.roundType.step;
    this.weight = round.roundType.start - (round.roundType.step * (this.routeParams.quizNumber - 1));
  }

  initPreviousQuizResults() {
    return this.resultServiceFactory.filter({by: 'round', val: this.routeParams.roundNumber}, this.routeParams.gameId)
      .then(results => {
        let res = {};
        results.forEach(result => {
          res[result.teamId] = {};
          res[result.teamId].quizNumber = result.quiz;
          res[result.teamId].score = result.score;
        });
        this.previousQuizResults = res;
        return res;
      });
  }

  setDisableStatuses() {
    if (!this.isFirstQuiz()) {
      this.results.forEach(result => {
        this.setInputDisableStatus(result);
      });
    }
  }

  isFirstQuiz() {
    return this.routeParams.quizNumber === '1';
  }

  private setInputDisableStatus(result) {
    if (!this.isTeamAnsweredInRound(result)) {
      this.enableInput(result);
    } else {
      if (this.isTeamAnsweredToPreviousQuestion(result)) {
        this.disableInput(result);
      }
    }
  }

  private isTeamAnsweredInRound(result) {
    return this.previousQuizResults[result.teamId] !== undefined;
  }

  private isTeamAnsweredToPreviousQuestion(result) {
    return this.previousQuizResults[result.teamId].quizNumber < (+this.routeParams.quizNumber);
  }

  private enableInput(result) {
    result.disabled = false;
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

  saveResult(result) {
    this.saved.emit(result);
  }

}
