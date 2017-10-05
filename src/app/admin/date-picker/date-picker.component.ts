import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit, OnChanges {
  @Output() date = new EventEmitter<any>();
  @Input() gameDate;
  bsConfig;
  minDate = new Date();

  constructor(private translate: TranslateService) {
  }

  _bsValue: Date;

  get bsValue(): Date {
    return this._bsValue;
  }

  set bsValue(v: Date) {
    this._bsValue = v;
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let prop in changes) {
      if (prop === "gameDate") {
        this._bsValue = changes[prop].currentValue;
      }
    }
  }

  updateDate() {
    this.date.emit(this._bsValue);
  }

  ngOnInit() {
    this.bsConfig = Object.assign({}, { containerClass: "theme-blue" });
    let locale = this.translate.currentLang;
    this.translate.onLangChange.subscribe((event) => {
      this.applyLocale(event.lang);
    });
    this.applyLocale(locale)
  }

  applyLocale(locale) {
    this.bsConfig = Object.assign(this.bsConfig, { locale: locale });
  }

}
