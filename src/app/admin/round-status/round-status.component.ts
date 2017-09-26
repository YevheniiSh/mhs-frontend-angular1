import { Component, Inject, OnInit } from '@angular/core';
import { BackupService } from '../../services/backup/backup.service';
import { DomSanitizer } from "@angular/platform-browser";


@Component({
  selector: 'app-round-status',
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
              @Inject('seasonService') private seasonService,
              private backupService: BackupService,
              private sanitizer: DomSanitizer) {
    this.gameId = $routeParams.gameId;

    GameService
      .getCurrentRound(this.gameId)
      .then((currentRound) => {
        RoundStatusService
          .getRounds(this.gameId)
          .then((rounds) => {
            rounds.forEach((item) => {
              this.addRound(item, currentRound);
            });
            if (this.prevRounds.length === rounds.length) {
              this.checked = true;
            }
          });
      }, (err) => {
        console.error(err);
      });
    this.createBackup();
  }

  private addRound(round, currentRound) {
    if (round.$id > currentRound) {
      this.nextRounds.push(round);
    } else if (round.$id < currentRound) {
      this.prevRounds.push(round);
    } else {
      this.currentRound = round;
    }
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

  onFinished(): void {
    this.ResultService.setGameWinner(this.gameStatus, this.gameId)
      .then(() => {
        this.ResultService.setTeamPosition(this.gameId);
      })
      .then(() => {
        this.GameService.finishGame(this.gameId);
        this.seasonService.finishGame(this.gameId);
      })
      .then(() => {
        this.createBackup();
      });
  }

  createBackup(): void {
    if (!this.isCreateBackupChecked) {
      this.disableFinished = true;
      this.backupService.saveBackup().then((res) => {
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(res);
        this.date = new Date();
        // this.$location.path('games/' + this.gameId + '/results');
      });
    } else {
      // this.$location.path('games/' + this.gameId + '/results');
    }
  }
}
