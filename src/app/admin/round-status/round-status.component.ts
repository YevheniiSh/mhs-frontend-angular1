import { Component, Inject } from '@angular/core';

@Component({
  selector: 'mhs-round-status',
  templateUrl: './round-status.component.html',
  styleUrls: ['./round-status.component.css']
})
export class RoundStatusComponent {

  gameId: string;
  gameStatus: string;
  nextRounds = [];
  prevRounds = [];
  currentRound = [];
  checked = false;
  disableFinished: boolean;

  constructor(@Inject('$routeParams') private $routeParams,
              @Inject('$location') private $location,
              @Inject('GameServiceFactory') private GameService,
              @Inject('RoundStatusService') private RoundStatusService,
              @Inject('ResultServiceFactory') private ResultService,
              @Inject('seasonService') private seasonService) {
    this.gameId = $routeParams.gameId;
    this.initRounds(GameService, RoundStatusService);
    this.getGameStatus()
      .then((status) => {
        this.gameStatus = status;
        if (status !== 'current') {
          this.$location.path('/games');
        }
      });
  }

  private getGameStatus() {
    return this.GameService.getGameStatus(this.gameId);
  }

  private initRounds(GameService, RoundStatusService) {
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

  private setRound(round, roundNum) {
    if (+round.$id === +roundNum) {
      this.currentRound.push(round);
    } else if (round.$id < roundNum) {
      this.prevRounds.push(round);
    } else {
      this.nextRounds.push(round);
    }
  }

  onFinished() {
    this.ResultService.setGameWinner(this.gameStatus, this.gameId)
      .then(() => {
        return this.ResultService.setTeamPosition(this.gameId);
      })
      .then(() => {
        this.GameService.finishGame(this.gameId);
        this.seasonService.finishGame(this.gameId);
      })
      .then(this.$location.path(`games/${this.gameId}/results`));
  }
}
