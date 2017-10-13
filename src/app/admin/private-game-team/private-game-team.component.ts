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
    this.openGameService.getPrivateGameTeams(this.gameId)
      .then(teams => {
        this.teams = teams;
      });
  }

  ngOnInit() {
  }

  addTeam() {
    this.teams.push(new Team(this.newTeamName));
    this.newTeamName = '';
  }

  removeTeam(teamId) {
    this.teams.splice( teamId, 1 );
  }

  saveTeams() {
    this.openGameService.setPrivateGameTeams(this.gameId, this.teams);
  }
}
