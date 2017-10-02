import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';

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
    result.checked = 0;
    const resultKey = [result.round, result.quiz, result.teamId].join('_');
    this.resultServiceFactory.deleteResult(this.routeParams.gameId, resultKey);
  };

  constructor(@Inject('GameServiceFactory')private gameServiceFactory,
              @Inject('$routeParams')private routeParams,
              @Inject('ResultServiceFactory')private resultServiceFactory) {

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
        this.updateResultDisabledStatus();
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
    return this.resultServiceFactory.filter({ by: 'round', val: this.routeParams.roundNumber }, this.routeParams.gameId)
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

  updateResultDisabledStatus() {
    this.results.forEach(result => {
      if (!this.isFirstQuiz()) {
        if (this.previousQuizResults[result.teamId] === undefined) {
          result.disabled = false;
        } else {
          if (this.previousQuizResults[result.teamId].quizNumber < (+this.routeParams.quizNumber)) {
            if (this.previousQuizResults[result.teamId].score > 0) {
              result.score = this.previousQuizResults[result.teamId].score - ((+this.routeParams.quizNumber) -
                this.previousQuizResults[result.teamId].quizNumber) * this.step;
            } else {
              result.score = -1;
            }
            result.disabled = true;
          }
        }
      }
    });
  }

  isFirstQuiz() {
    return this.routeParams.quizNumber === '1';
  }

  saveResult(result) {
    this.saved.emit(result);
  }

}
