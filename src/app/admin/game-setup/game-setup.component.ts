import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'mhs-game-setup',
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.css']
})
export class GameSetupComponent implements OnInit {

  @Input() defaultDate;
  @Input() defaultTime;
  @Input() defaultLocation;
  @Input() defaultIsSeasonGame;

  @Output() location = new EventEmitter<string>();
  @Output() time = new EventEmitter<Date>();
  @Output() date = new EventEmitter<Date>();
  @Output() season = new EventEmitter<any>();
  @Output() isSeasonGame = new EventEmitter<boolean>();

  locationInput = new FormGroup({
    location: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  constructor() {
  }

  ngOnInit() {
  }

  setGameDate(event) {
    this.date.emit(event);
  }

  setGameTime(event) {
    this.time.emit(event);
  }

  setGameLocation() {
    this.location.emit(this.defaultLocation);
  }

  setIsSeasonGame(event) {
    this.isSeasonGame.emit(event);
  }

  setSeason(event) {
    this.season.emit(event);
  }
}
