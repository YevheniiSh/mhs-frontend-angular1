import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'mhs-round-status',
  templateUrl: './round-status.component.html',
  styleUrls: ['./round-status.component.css']
})
export class RoundStatusComponent implements OnInit {

  gameId: string;
  gameStatus: string;
  nextRounds = [];
  prevRounds = [];
  currentRound;
  url;
  date;
  startRoundTooltip = false;
  checked = false;
  disableFinished: boolean;
  isCreateBackupChecked: boolean;

  constructor(@Inject('$routeParams') private $routeParams,
              @Inject('$location') private $location,
              @Inject('GameServiceFactory') private GameService,
              @Inject('RoundStatusService') private RoundStatusService,
              @Inject('ResultServiceFactory') private ResultService,
              @Inject('seasonService') private seasonService) {
    this.gameId = $routeParams.gameId;
    let roundNum;
    GameService.getCurrentRound(this.gameId)
      .then((res) => {
        roundNum = res;
        return RoundStatusService.getRounds(this.gameId);
      })
      .then((rounds) => {
        rounds.forEach((item) => {
          this.setRound(item, roundNum);
        });
        if (this.prevRounds.length === rounds.length) {
          this.checked = true;
        }
      });
  }

  ngOnInit() {
    this.GameService.getGameStatus(this.gameId)
      .then((status) => {
        this.gameStatus = status;
        if (status === 'finished') {
          this.$location.path('/games');
        }
      });
  }

  private setRound(round, roundNum) {
    if (+round.$id === +roundNum) {
      this.currentRound = round;
    } else {
      (round.$id < roundNum) ? this.prevRounds.push(round) : this.nextRounds.push(round);
    }

  }

  // onFinished() {
  //   this.ResultService.setGameWinner(this.gameStatus, this.gameId)
  //     .then(() => {
  //       this.ResultService.setTeamPosition(this.gameId);
  //     })
  //     .then(() => {
  //       this.GameService.finishGame(this.gameId);
  //       this.seasonService.finishGame(this.gameId);
  //     })
  //     .then(this.$location.path(`games/${this.gameId}/results`));
  // }
}
