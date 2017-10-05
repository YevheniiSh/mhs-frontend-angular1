// moment.js locale configuration
// locale : Russian [ru]
// author : Viktorminator : https://github.com/Viktorminator
// Author : Menelion Elensúle : https://github.com/Oire
// author : Коренберг Марк : https://github.com/socketpair

import { LocaleData } from 'ngx-bootstrap/bs-moment/locale/locale.class';

function plural(word: string, num: number): string {
  const forms = word.split('_');

  return num % 10 === 1 && num % 100 !== 11
    ? forms[0]
    : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)
      ? forms[1]
      : forms[2];
}

function relativeTimeWithPlural(num: number,
                                withoutSuffix: boolean,
                                key: string): string {
  const format: any = {
    mm: withoutSuffix ? 'минута_минуты_минут' : 'минуту_минуты_минут',
    hh: 'час_часа_часов',
    dd: 'день_дня_дней',
    MM: 'месяц_месяца_месяцев',
    yy: 'год_года_лет'
  };
  if (key === 'm') {
    return withoutSuffix ? 'минута' : 'минуту';
  } else {
    return `${num} ${plural(format[key], +num)}`;
  }
}

const monthsParse = [
  /^січ/i,
  /^лют/i,
  /^бер/i,
  /^кві/i,
  /^тра/i,
  /^чер/i,
  /^лип/i,
  /^сер/i,
  /^вер/i,
  /^жов/i,
  /^лис/i,
  /^гру/i
];

// http://new.gramota.ru/spravka/rules/139-prop : § 103
// Сокращения месяцев: http://new.gramota.ru/spravka/buro/search-answer?s=242637
// CLDR data:          http://www.unicode.org/cldr/charts/28/summary/ru.html#1753
export const uk: LocaleData = {
  abbr: 'uk',
  months: {
    format: 'січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня'.split(
      '_'
    ),
    standalone: 'січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень'.split(
      '_'
    )
  },
  monthsShort: {
    // по CLDR именно "июл." и "июн.", но какой смысл менять букву на точку ?
    format: 'янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.'.split(
      '_'
    ),
    standalone: 'янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.'.split(
      '_'
    )
  },
  weekdays: {
    standalone: 'неділя_понеділок_вівторок_середа_четвер_п\'ятница_субота'.split(
      '_'
    ),
    format: 'неділю_понеділок_вівторок_середу_четвер_п\'ятницю_суботу'.split(
      '_'
    ),
    isFormat: /\[ ?[Вв] ?(?:минулу|наступну|цю)? ?\] ?dddd/
  },
  weekdaysShort: 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
  weekdaysMin: 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
  monthsParse,
  longMonthsParse: monthsParse,
  shortMonthsParse: monthsParse,

  // // полные названия с падежами, по три буквы, для некоторых, по 4 буквы, сокращения с точкой и без точки
  // monthsRegex: /^(січен[ья]|січ\.?|лют[ий.ого]|лют?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,
  //
  // // копия предыдущего
  // monthsShortRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,
  //
  // // полные названия с падежами
  // monthsStrictRegex: /^(январ[яь]|феврал[яь]|марта?|апрел[яь]|ма[яй]|июн[яь]|июл[яь]|августа?|сентябр[яь]|октябр[яь]|ноябр[яь]|декабр[яь])/i,
  //
  // // Выражение, которое соотвествует только сокращённым формам
  // monthsShortStrictRegex: /^(янв\.|февр?\.|мар[т.]|апр\.|ма[яй]|июн[ья.]|июл[ья.]|авг\.|сент?\.|окт\.|нояб?\.|дек\.)/i,
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY г.',
    LLL: 'D MMMM YYYY г., HH:mm',
    LLLL: 'dddd, D MMMM YYYY г., HH:mm'
  },
  relativeTime: {
    future: 'через %s',
    past: '%s назад',
    s: 'декілька секунд',
    m: relativeTimeWithPlural,
    mm: relativeTimeWithPlural,
    h: 'година',
    hh: relativeTimeWithPlural,
    d: 'день',
    dd: relativeTimeWithPlural,
    M: 'місяц',
    MM: relativeTimeWithPlural,
    y: 'рік',
    yy: relativeTimeWithPlural
  },
  meridiemParse: /ночі|ранку|дня|вечора/i,
  isPM(input: string): boolean {
    return /^(дня|вечора)$/.test(input);
  },
  meridiem(hour: number): string {
    if (hour < 4) {
      return 'ночі';
    } else if (hour < 12) {
      return 'ранку';
    } else if (hour < 17) {
      return 'дня';
    } else {
      return 'вечора';
    }
  },
  dayOfMonthOrdinalParse: /\d{1,3}-(й|ій|ий)/,
  ordinal(num: number, period: string): string {
    switch (period) {
      case 'M':
      case 'd':
      case 'DDD':
        return `${num}-й`;
      case 'D':
        return `${num}-го`;
      case 'w':
      case 'W':
        return `${num}-я`;
      default:
        return num.toString(10);
    }
  },
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4 // The week that contains Jan 4th is the first week of the year.
  }
};
