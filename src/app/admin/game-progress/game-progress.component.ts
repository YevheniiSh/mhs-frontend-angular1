import { Component, Inject } from '@angular/core';

@Component({
  selector: 'mhs-game-progress',
  templateUrl: './game-progress.component.html',
  styleUrls: ['./game-progress.component.css']
})
export class GameProgressComponent {

  gameId: string;
  gameStatus: string;
  nextRounds = [];
  prevRounds = [];
  currentRound = [];
  checked = false;
  disableFinished: boolean;

  constructor(@Inject('$routeParams') private $routeParams,
              @Inject('$location') private $location,
              @Inject('GameServiceFactory') private gameService,
              @Inject('RoundStatusService') private roundService,
              @Inject('ResultServiceFactory') private resultService,
              @Inject('seasonService') private seasonService) {
    this.gameId = $routeParams.gameId;
    this.initRounds(gameService, roundService);
    this.getGameStatus()
      .then((status) => {
        this.gameStatus = status;
        if (status !== 'current') {
          this.$location.path('/games');
        }
      });
  }

  private getGameStatus() {
    return this.gameService.getGameStatus(this.gameId);
  }

  private initRounds(gameService, roundService) {

    Promise.all([
      roundService.getRounds(this.gameId),
      gameService.getCurrentRound(this.gameId)
    ])
      .then(([rounds, roundNum])  => {
        rounds.forEach((r) => {
          this.addRound(r, roundNum);
        });
        if (this.prevRounds.length === rounds.length) {
          this.checked = true;
        }
      });
  }

  private addRound(round, roundNum) {
    if (+round.$id === +roundNum) {
      this.currentRound.push(round);
    } else if (round.$id < roundNum) {
      this.prevRounds.push(round);
    } else {
      this.nextRounds.push(round);
    }
  }

  finishRound() {
    this.resultService.setGameWinner(this.gameStatus, this.gameId)
      .then(() => {
        return this.resultService.setTeamPosition(this.gameId);
      })
      .then(() => {
        this.gameService.finishGame(this.gameId);
        this.seasonService.finishGame(this.gameId);
      })
      .then(this.$location.path(`games/${this.gameId}/results`));
  }
}
