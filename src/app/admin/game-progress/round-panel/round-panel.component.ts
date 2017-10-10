import { Component, Inject, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mhs-round-panel',
  templateUrl: './round-panel.component.html',
  styleUrls: ['./round-panel.component.css']
})
export class RoundPanelComponent implements OnInit {
  @Input() title: string;
  @Input() rounds;
  @Input() btnClass: string;
  @Input() hasLink: boolean;
  gameId: string;

  constructor(@Inject('$routeParams') private $routeParams,
              @Inject('$location') private $location) {
    this.gameId = $routeParams.gameId;
  }

  ngOnInit() {
  }

  redirectToRound(round) {
    if (this.hasLink) {
      this.$location.path(`games/${this.gameId}/rounds/${round.$id}/1`);
    }
  }

}
