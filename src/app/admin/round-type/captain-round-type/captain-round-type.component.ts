import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-captain-round-type',
  templateUrl: './captain-round-type.component.html',
  styleUrls: ['./captain-round-type.component.css']
})
export class CaptainRoundTypeComponent implements OnInit {
  @Input() results;
  @Input() saveResult;
  @Input() quizWeight;
  @Output() saved = new EventEmitter<any>();
  previousQuizResults;
  quizNumber;
  gameId;
  roundNumber;

  constructor(@Inject('$routeParams') private $routeParams,
              @Inject('GameServiceFactory') private gameServiceFactory,
              @Inject('ResultServiceFactory') private resultService) {

    this.quizNumber = this.$routeParams.quizNumber;
    this.gameId = this.$routeParams.gameId;
    this.roundNumber = this.$routeParams.roundNumber;
  }

  ngOnInit() {
    this.initPreviousQuizResults();
  }

  save(result) {
    result.score = result.status ? this.quizWeight : 0;
    this.saved.emit(result);
  }

  initPreviousQuizResults() {
    this.resultService.getByRoundAndQuiz(this.roundNumber, this.quizNumber - 1, this.gameId)
      .then(results => {
        this.previousQuizResults = results;
      });
  }

  isDisabled(teamId) {
    if (!this.isFirstQuiz()) {
      const resultKey = [this.roundNumber, this.quizNumber - 1, teamId].join('_');
      if (this.previousQuizResults !== undefined) {
        if (this.previousQuizResults[resultKey] === undefined) {
          return true;
        } else if (!this.previousQuizResults[resultKey].score) {
          return true;
        }
      }
      return false;
    }
  }

  isFirstQuiz() {
    return this.quizNumber === '1';
  }

}
