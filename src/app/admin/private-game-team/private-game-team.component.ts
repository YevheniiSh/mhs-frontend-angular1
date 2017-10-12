import { Component, Inject, OnInit } from '@angular/core';
import { Team } from "./team";

@Component({
  selector: 'mhs-private-game-team',
  templateUrl: './private-game-team.component.html',
  styleUrls: ['./private-game-team.component.css']
})
export class PrivateGameTeamComponent implements OnInit {

  teams;
  newTeamName: string;
  gameId: string;

  constructor(@Inject('$routeParams') private $routeParams,
              @Inject('OpenGameServiceFactory') private openGameService) {
    this.gameId = $routeParams.gameId;
    this.openGameService.getTeams(this.gameId)
      .then(teams => {
        this.teams = teams;
      });
  }

  ngOnInit() {
  }

  addTeam() {
    this.teams.push(new Team(this.newTeamName));
    this.newTeamName = null;
  }

  saveTeams() {
    this.openGameService.addTeamsToPrivateGame(this.gameId, this.teams);
  }
}
