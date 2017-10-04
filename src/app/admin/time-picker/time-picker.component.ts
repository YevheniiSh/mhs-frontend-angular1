import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css'],
})
export class TimePickerComponent implements OnInit {

  @Output() time = new EventEmitter<any>();
  private gametime: Date = new Date();
  private visibleTime;
  private isPopupVisible: boolean;

  constructor(@Inject('convertServiceFactory') private convertServiceFactory) {
  }

  ngOnInit() {
    this.gametime.setHours(19);
    this.gametime.setMinutes(0);
    this.isPopupVisible = false;
    this.getTimeForView();
    this.time.emit(this.gametime);
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
