import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Downgrade } from '../../../hybrid/downgrade';

@Component({
  selector: 'mhs-hint-round-type',
  templateUrl: './hint-round-type.component.html',
  styleUrls: ['./hint-round-type.component.css']
})
@Downgrade()
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
        const res = {};
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
