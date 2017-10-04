import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  @Output() date = new EventEmitter<any>();

  bsConfig;

  minDate = new Date();

  constructor() {
  }

  _bsValue: Date;

  get bsValue(): Date {
    return this._bsValue;
  }

  set bsValue(v: Date) {
    this._bsValue = v;
    this.date.emit(v);
  }

  ngOnInit() {
    this.bsConfig = Object.assign({}, { containerClass: "theme-blue" });
    this._bsValue = new Date;
  }

}
