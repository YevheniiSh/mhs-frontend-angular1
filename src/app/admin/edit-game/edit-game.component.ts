import { Component, Inject, Input, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification-service/notification.service';
import { Downgrade } from '../../hybrid/downgrade';

@Downgrade()
@Component({
  selector: 'mhs-edit-game',
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
        this.currentGameTime = new Date(game.time);
      });
  }


  setGameLocation(location) {
    this.location = location;
    this.openGameService.changeLocation(this.gameId, this.location)
      .then(this.showSuccess('SAVE_LOCATION_MESSAGE'));
  }

  setGameDate(gameDate) {
    this.gameDate = gameDate;
    this.openGameService.changeDate(this.gameId, this.gameDate)
      .then(this.showSuccess('SAVE_DATE_MESSAGE'));
  }

  setGameTime(gameTime) {
    this.gameTime = gameTime;
    this.openGameService.changeTime(this.gameId, this.gameTime)
      .then(this.showSuccess('SAVE_TIME_MESSAGE'));

  }

  setIsPrivate(isPrivate) {
    this.isPrivate = isPrivate;
    this.openGameService.changeIsPrivate(this.gameId, this.isPrivate)
      .then(this.showSuccess('GAME_STATUS_SAVE'));
  }

  setIsSeasonGame(isSeasonGame) {
    this.isSeasonGame = isSeasonGame;
    const seasonInGame = { id: this.season.$id, name: this.season.name };
    if (this.isSeasonGame) {
      this.openGameService.changeSeason(this.gameId, seasonInGame)
        .then(this.showSuccess('SAVE_SEASON_MESSAGE'));
    } else {
      this.openGameService.deleteSeason(this.gameId, seasonInGame)
        .then(this.showSuccess('SAVE_SEASON_MESSAGE'));
    }
  }

  setSeason(season) {
    this.season = season;
  }

  showSuccess(message) {
    return () => {
      this.notificationService.showSuccess(message);
    };
  }

}
