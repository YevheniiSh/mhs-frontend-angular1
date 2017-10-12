import { FactoryProvider } from '@angular/core';

const SeasonServiceToken = 'seasonService';

export function seasonServiceInjector(i: any) {
  return i.get(SeasonServiceToken);
}

export const SeasonService: FactoryProvider = {
  provide: SeasonServiceToken,
  useFactory: seasonServiceInjector,
  deps: ['$injector']
};
