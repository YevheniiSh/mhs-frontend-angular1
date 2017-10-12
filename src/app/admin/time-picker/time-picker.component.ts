import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'mhs-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css'],
})
export class TimePickerComponent implements OnInit, OnChanges {
  @Input() defaultTime;
  @Output() time = new EventEmitter<Date>();

  private selectedTime: Date = new Date;
  private visibleTime;
  private isPopupVisible: boolean;

  constructor(@Inject('convertServiceFactory') private convertServiceFactory) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const prop in changes) {
      if (prop === 'defaultTime') {
        if (changes[prop].currentValue !== undefined) {
          this.selectedTime = changes[prop].currentValue;
        }
        this.getTimeForView();
      }
    }
  }

  ngOnInit() {

  }

  toogleTimePicker() {
    this.isPopupVisible = !this.isPopupVisible;
  }

  getTimeForView() {
    this.visibleTime = this.convertServiceFactory.convertTimeForView(this.selectedTime);
  }

  updateTime(event) {
    this.selectedTime = event;
    this.getTimeForView();
    this.time.emit(this.selectedTime);
  }

  closeTimePiker() {
    this.isPopupVisible = false;
  }

}
