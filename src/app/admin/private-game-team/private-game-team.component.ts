import { Component, Inject, OnInit } from '@angular/core';
import { Team } from './team';
import { Downgrade } from '../../hybrid/downgrade';

@Downgrade()
@Component({
  selector: 'mhs-private-game-team',
  templateUrl: './private-game-team.component.html',
  styleUrls: ['./private-game-team.component.css']
})
export class PrivateGameTeamComponent implements OnInit {

  teams: Team[];
  newTeamName: string;
  gameId: string;

  constructor(@Inject('$routeParams') private $routeParams,
              @Inject('OpenGameServiceFactory') private openGameService) {
    this.gameId = $routeParams.gameId;
    this.openGameService.getTeams(this.gameId)
      .then(teams => {
        this.teams = teams.map(team => team.name);
        console.log(this.teams)
      });
  }

  ngOnInit() {
  }

  addTeam() {
    this.openGameService.addTeamToPrivateGame(this.gameId, new Team().name = this.newTeamName);
    this.newTeamName = '';
  }

  removeTeam(team) {
    this.openGameService.removeTeamFromPrivateGame(this.gameId, team);
  }

  updateTeam(team) {
    this.openGameService.updateTeamInPrivateGame(team);
  }
}
