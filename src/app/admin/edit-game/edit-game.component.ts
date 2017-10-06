import { Component, Inject, Input, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification-service/notification.service';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent implements OnInit {

  @Input() gameId;

  currentGameTime;
  currentGameDate;

  location;
  gameDate;
  gameTime;

  isSeasonGame;
  seasonId;
  season;
  isPrivate: boolean;

  constructor(@Inject('OpenGameServiceFactory') private openGameService,
              @Inject('seasonService') private seasonService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.setupGameInfo();
    this.openGameService.getSeason(this.gameId)
      .then((season) => {
        if (season !== undefined) {
          this.seasonId = season;
          this.isSeasonGame = true;
        }
      });
  }

  setupGameInfo() {
    this.openGameService.getOpenGameById(this.gameId)
      .then(game => {
        this.currentGameDate = new Date(game.date);
        this.location = game.location;
        this.isPrivate = game.isPrivate;
      });

    this.openGameService.getTime(this.gameId).then((res) => {
      this.currentGameTime = new Date(res);
      console.log(this.currentGameTime);
    });
  }


  setGameLocation() {
    this.openGameService.changeLocation(this.gameId, this.location).then(() => {
      this.notificationService.showSuccess('SAVE_LOCATION_MESSAGE');
    });
  }

  setGameDate(gameDate) {
    this.gameDate = gameDate;
    this.openGameService.changeDate(this.gameId, this.gameDate).then(() => {
      this.notificationService.showSuccess('SAVE_DATE_MESSAGE');
    });
  }

  setGameTime(gameTime) {
    this.gameTime = gameTime;
    this.openGameService.changeTime(this.gameId, this.gameTime).then(() => {
      this.notificationService.showSuccess('SAVE_TIME_MESSAGE');
    });
  }

  setIsPrivate(isPrivate) {
    this.isPrivate = this.isPrivate;
    this.openGameService.changeIsPrivate(this.gameId, this.isPrivate)
      .then(() => {
        this.notificationService.showSuccess('SAVE_TIME_MESSAGE');
      });
  }

  setIsSeasonGame(isSeasonGame) {
    this.isSeasonGame = isSeasonGame;
    if (this.isSeasonGame) {
      const seasonInGame = { id: this.season.$id, name: this.season.name };
      this.openGameService.changeSeason(this.gameId, seasonInGame).then(() => {
        this.notificationService.showSuccess('SAVE_SEASON_MESSAGE');
        this.seasonService.addGameToSeason(this.season.$id, this.gameId);
      });
    }
    else {
      this.openGameService.deleteSeason(this.gameId).then(() => {
        this.notificationService.showSuccess('SAVE_SEASON_MESSAGE');
        this.seasonService.deleteGameFromSeason(this.season.$id, this.gameId);
      });
    }
  }

  setSeason(season) {
    this.season = season;
  }

}
