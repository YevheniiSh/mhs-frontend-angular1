import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { CustomConfirmationService } from '../../../services/confirmation-service/confirmation.service';

@Component({
  selector: 'app-captain-round-type',
  templateUrl: './captain-round-type.component.html',
  styleUrls: ['./captain-round-type.component.css']
})
export class CaptainRoundTypeComponent implements OnInit {
  @Input() results;
  @Input() saveResult;
  @Input() closeRound;
  @Input() isCaptainsOut;
  @Output() saved = new EventEmitter<any>();
  weight;
  previousQuizResults;
  quizNumber;
  gameId;
  roundNumber;

  constructor(@Inject('$routeParams') private $routeParams,
              @Inject('GameServiceFactory') private gameServiceFactory,
              @Inject('ResultServiceFactory') private resultService,
              private customConfirmationService: CustomConfirmationService) {

    this.quizNumber = this.$routeParams.quizNumber;
    this.gameId = this.$routeParams.gameId;
    this.roundNumber = this.$routeParams.roundNumber;

    this.getRound()
      .then((round) => {
        this.getQuizWeight(round);
      });
    this.initPreviousQuizResults();
  }

  ngOnInit() {
    // $scope.$watch(() => {
    //     return this.isCaptainsOut;
    //   },
    //   (newValue) => {
    //     console.log(newValue);
    //     if (newValue) {
    //       this.showCloseRoundDialog();
    //     }
    //   });
  }

  // vm.noCaptainsAlertDisplay = false;

  save(result) {
    result.score = result.status ? this.weight : 0;
    this.saved.emit(result);
  }

  showCloseRoundDialog() {
    this.customConfirmationService.create('NO_CAPTAINS_ALERT')
      .then((res) => {
        if (res.resolved) {
          this.closeRound();
        }
      });
  }

  getRound() {
    return this.gameServiceFactory.getRoundByGameAndId(this.gameId, this.roundNumber);
  }

  getQuizWeight(round) {
    this.weight = +(round.roundType.start + (round.roundType.step * (this.quizNumber - 1))).toFixed(1);
  }

  initPreviousQuizResults() {
    this.resultService.getByRoundAndQuiz(
      this.roundNumber,
      this.quizNumber - 1,
      this.gameId
    )
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
