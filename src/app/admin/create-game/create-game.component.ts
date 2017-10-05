import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {

  gameDate;
  gameTime;
  location;
  isSeasonGame;
  season;

  defaultTime = new Date();
  defaultDate = new Date();

  createNewGame = function () {
    let gameBuider = this.gameBuild.addDate(this.gameDate)
      .addTime(this.gameTime)
      .addLocation(this.location);
    if (this.isSeasonGame) {
      gameBuider.addSeason({ id: this.season.$id, name: this.season.name });
    } else {
      delete gameBuider.game.season;
    }
    let game = gameBuider.buildGame();
    this.openGameService.createNewGame(game)
      .then((gameId) => {
        if (this.isSeasonGame) {
          this.seasonService.addGameToSeason(this.season.$id, gameId)
        }
        this.location = null;
      })

  };
  setGameDate = function (date) {
    this.gameDate = date;
  };
  setGameTime = function (time) {
    this.gameTime = time;
  };
  setSeason = function (season) {
    this.season = season;
  };
  setIsSeasonGame = function (isSeasonGame) {
    this.isSeasonGame = isSeasonGame;
  };

  constructor(@Inject('OpenGameServiceFactory') private openGameService,
              @Inject('gameBuildServiceFactory') private gameBuild,
              @Inject('seasonService') private seasonService) {
  }

  ngOnInit() {
    this.defaultTime.setHours(19);
    this.defaultTime.setMinutes(0);

    this.gameDate = this.defaultDate;
    this.gameTime = this.defaultTime;


  }

}
