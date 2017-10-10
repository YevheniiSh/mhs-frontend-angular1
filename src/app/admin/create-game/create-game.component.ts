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
  isPrivateGame = false;

  createNewGame = function () {
    const gameBuider = this.gameBuild.addDate(this.gameDate)
      .addTime(this.gameTime)
      .addLocation(this.location)
      .addPrivate(this.isPrivateGame);
    if (this.isSeasonGame) {
      gameBuider.addSeason({ id: this.season.$id, name: this.season.name });
    } else {
      delete gameBuider.game.season;
    }
    const game = gameBuider.buildGame();

    if (this.isSeasonGame) {
      this.openGameService.createNewGame(game, this.season);
    }
    else {
      this.openGameService.createNewGame(game);
    }

    this.location = null;

  };

  setGameDate(date) {
    this.gameDate = date;
  };

  setGameTime(time) {
    this.gameTime = time;
  };

  setSeason(season) {
    this.season = season;
  };

  setIsSeasonGame(isSeasonGame) {
    this.isSeasonGame = isSeasonGame;
  }

  setIsPrivateGame = function (isPrivateGame) {
    this.isPrivateGame = isPrivateGame;
  };

  setGameLocation(location) {
    this.location = location;
  }

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
