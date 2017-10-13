import { Component, Inject, OnInit } from '@angular/core';
import { PrivateTeam } from './private-team';
import { Downgrade } from '../../hybrid/downgrade';
import { NotificationService } from '../../services/notification-service/notification.service';

@Downgrade()
@Component({
  selector: 'mhs-private-game-team',
  templateUrl: './private-game-team.component.html',
  styleUrls: ['./private-game-team.component.css']
})
export class PrivateGameTeamComponent implements OnInit {

  teams: PrivateTeam[];
  newTeamName: string;
  gameId: string;

  constructor(@Inject('$routeParams') private $routeParams,
              @Inject('OpenGameServiceFactory') private openGameService,
              private notificationService: NotificationService) {
    this.gameId = $routeParams.gameId;
    this.openGameService.getTeams(this.gameId)
      .then(teams => {
        this.teams = teams;
      });
  }

  ngOnInit() {
  }

  addTeam() {
    this.openGameService.addPrivateTeam(this.gameId, new PrivateTeam(this.newTeamName))
      .then(() => {
        this.notificationService.showSuccess('TEAM_SAVE_MESSAGE');
      });
    this.newTeamName = '';
  }

  removeTeam(team) {
    this.openGameService.deletePrivateTeam(this.gameId, team)
      .then(() => {
        this.notificationService.showError('TEAM_REMOVE_MESSAGE');
      });
  }

  updateTeam(team) {
    this.openGameService.updatePrivateTeam(this.gameId, team)
      .then(() => {
        this.notificationService.showSuccess('TEAM_SAVE_MESSAGE');
      });
  }
}
