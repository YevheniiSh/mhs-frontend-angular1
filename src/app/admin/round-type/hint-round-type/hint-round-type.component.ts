import {Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChange} from '@angular/core';
import {CustomConfirmationService} from "../../../services/confirmation-service/confirmation.service";

@Component({
  selector: 'app-hint-round-type',
  templateUrl: './hint-round-type.component.html',
  styleUrls: ['./hint-round-type.component.css']
})
export class HintRoundTypeComponent implements OnInit, OnChanges {

  step;
  weight;
  previousQuizResults;
  @Input() results;
  @Output() saved = new EventEmitter<any>();
  @Input() isTeamsOut;
  @Output() closeRound = new EventEmitter<any>();
  clearResult = function (result) {
    result.checked = 0;
    let resultKey = [result.round, result.quiz, result.teamId].join('_');
    this.resultServiceFactory.deleteResult(this.routeParams.gameId, resultKey)
  };

  constructor(@Inject('GameServiceFactory') private gameServiceFactory,
              @Inject('$routeParams') private routeParams,
              @Inject('ResultServiceFactory') private resultServiceFactory,
              private confirmationService: CustomConfirmationService) {

  }

  ngOnInit() {
    this.getRound()
      .then((round) => {
        this.getQuizWeight(round)
      })
      .then(() => {
        return this.initPreviousQuizResults();
      })
      .then(() => {
        this.isDisabled();
      });
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }): void {
    for (let propName in changes) {
      if (propName === 'isTeamsOut') {
        if (changes[propName].currentValue === true) {
          this.showCloseDialog();
        }
      }
    }
  }

  showCloseDialog() {
    this.confirmationService.create('FINISH_HINTS_ROUND_CONFIRMATION')
      .then((res) => {
        if (res.resolved) {
          this.closeRound.emit();
        }
      })
  }

  getRound() {
    return this.gameServiceFactory.getRoundByGameAndId(this.routeParams.gameId, this.routeParams.roundNumber);
  }

  getQuizWeight(round) {
    this.step = round.roundType.step;
    this.weight = round.roundType.start - (round.roundType.step * (this.routeParams.quizNumber - 1));
  }

  initPreviousQuizResults() {
    return this.resultServiceFactory.filter({by: "round", val: this.routeParams.roundNumber}, this.routeParams.gameId)
      .then(results => {
        let res = {};
        results.forEach(result => {
          res[result.teamId] = {};
          res[result.teamId].quizNumber = result.quiz;
          res[result.teamId].score = result.score;
        })
        this.previousQuizResults = res;
        return res;
      })
  }

  isDisabled() {
    this.results.forEach(result => {
      if (!this.isFirstQuiz()) {
        if (this.previousQuizResults[result.teamId] === undefined) {
          result.disabled = false;
        } else {
          if (this.previousQuizResults[result.teamId].quizNumber < (+this.routeParams.quizNumber)) {
            if (this.previousQuizResults[result.teamId].score > 0) {
              result.score = this.previousQuizResults[result.teamId].score - ((+this.routeParams.quizNumber) - this.previousQuizResults[result.teamId].quizNumber) * this.step;
            }
            else {
              result.score = -1;
            }
            result.disabled = true;
          }
        }
      }
    })
  };

  isFirstQuiz() {
    return this.routeParams.quizNumber === '1';
  }

  saveResult(result) {
    this.saved.emit(result);
  }

}
