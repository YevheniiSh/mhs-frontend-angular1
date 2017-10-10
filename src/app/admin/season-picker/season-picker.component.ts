import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-season-picker',
  templateUrl: './season-picker.component.html',
  styleUrls: ['./season-picker.component.css']
})
export class SeasonPickerComponent implements OnInit, OnChanges{

  season;
  newSeasonName = '';
  isSeasonEditor;
  @Input() isSeasonGame = false;
  @Input() isDisabled: boolean;
  showSeasonNameValidation;

  @Output() isSeasonGameEvent = new EventEmitter<any>();
  @Output() currentSeason = new EventEmitter<any>();

  constructor(@Inject('seasonService') private seasonService) {
  }

  ngOnInit() {
    this.getCurrentSeasonFromDb();
  }

  ngOnChanges() {
    if (this.isDisabled) {
      this.checkboxUpdate(false);
    }
  }

  getCurrentSeasonFromDb() {
    this.seasonService.getCurrentSeason()
      .then(season => {
        if (season) {
          this.season = season;
          this.currentSeason.emit(season);
        }
      });
  }

  saveSeason() {
    if (this.newSeasonName !== '') {
      this.seasonService.save({ name: this.newSeasonName })
        .then(seasonId => {
          this.seasonService.openSeason(seasonId);
          this.isSeasonEditor = false;
          this.isSeasonGame = false;
          this.checkboxUpdate(false);
          this.getCurrentSeasonFromDb();
        })
    } else {
      this.showSeasonNameValidation = true;
    }
  };

  closeSeasonEditor() {
    this.showSeasonNameValidation = false;
    this.isSeasonEditor = false;
  };

  checkboxUpdate(isSwitched) {
    this.isSeasonGame = isSwitched;
    this.isSeasonGameEvent.emit(isSwitched);
  }

}
