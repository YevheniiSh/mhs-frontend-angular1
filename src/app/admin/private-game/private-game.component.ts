import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'mhs-private-game',
  templateUrl: './private-game.component.html',
  styleUrls: ['./private-game.component.css']
})
export class PrivateGameComponent implements OnInit {

  @Output() isPrivate = new EventEmitter<any>();
  @Input() isPrivateGame;

  constructor() {
  }

  ngOnInit() {
  }

  checkboxUpdate(isSwitched) {
    this.isPrivate.emit(isSwitched);
  }
}
