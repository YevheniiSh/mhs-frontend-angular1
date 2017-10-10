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
    mm: withoutSuffix ? 'хвилина_хвилини_хвилин' : 'хлилину_хвилини_хвилин',
    hh: 'година_години_годин',
    dd: 'день_дня_днів',
    MM: 'місяць_місяця_місяців',
    yy: 'рік_року_років'
  };
  if (key === 'm') {
    return withoutSuffix ? 'хвилина' : 'хвилину';
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
