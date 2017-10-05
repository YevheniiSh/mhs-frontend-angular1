import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css'],
})
export class TimePickerComponent implements OnInit, OnChanges {
  @Input() currentGameTime;

  @Output() time = new EventEmitter<any>();
  private gametime: Date = new Date;

  ngOnChanges(changes: SimpleChanges): void {
    for (let prop in changes) {
      if (prop === "currentGameTime") {
        if (changes[prop].currentValue !== undefined) {
          this.gametime = changes[prop].currentValue;
        }
        this.getTimeForView();
      }
    }
  }
  private visibleTime;
  private isPopupVisible: boolean;

  constructor(@Inject('convertServiceFactory') private convertServiceFactory) {
  }

  ngOnInit() {

  }

  toogleTimePicker() {
    this.isPopupVisible = !this.isPopupVisible;
  }

  getTimeForView() {
    this.visibleTime = this.convertServiceFactory.convertTimeForView(this.gametime)
  };

  updateTime(event) {
    this.gametime = event;
    this.getTimeForView();
    this.time.emit(this.gametime);
  }

  closeTimePiker() {
    this.isPopupVisible = false;
  }

}
