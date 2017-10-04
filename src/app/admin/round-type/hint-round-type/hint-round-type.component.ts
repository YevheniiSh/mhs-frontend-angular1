import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-hint-round-type',
  templateUrl: './hint-round-type.component.html',
  styleUrls: ['./hint-round-type.component.css']
})
export class HintRoundTypeComponent implements OnInit {

  step;
  @Input() quizWeight;
  previousQuizResults;
  @Input() results;
  @Output() saved = new EventEmitter<any>();

  constructor(@Inject('$routeParams')private routeParams,
              @Inject('ResultServiceFactory')private resultServiceFactory) {

  }

  ngOnInit() {
    this.initPreviousQuizResults();
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

  saveResult(result) {
    this.saved.emit(result);
  }

}
