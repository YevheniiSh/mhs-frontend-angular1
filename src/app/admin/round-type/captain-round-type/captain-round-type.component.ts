import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-captain-round-type',
  templateUrl: './captain-round-type.component.html',
  styleUrls: ['./captain-round-type.component.css']
})
export class CaptainRoundTypeComponent implements OnInit {
  @Input() results;
  @Input() quizWeight;
  @Output() saved = new EventEmitter<any>();
  previousQuizResults;
  quizNumber;
  gameId;
  roundNumber;

  constructor(@Inject('$routeParams') private $routeParams,
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
        return !this.isTeamAnswered(resultKey);
      }
    }
    return false;
  }

  private isTeamAnswered(resultKey: string) {
    if (this.previousQuizResults[resultKey] !== undefined) {
      return this.isPositiveScore(this.previousQuizResults[resultKey]);
    } else {
      return false;
    }
  }

  private isPositiveScore(result) {
    return result.score > 0;
  }

  isFirstQuiz() {
    return this.quizNumber === '1';
  }

}
