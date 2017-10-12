import { FactoryProvider } from '@angular/core';

const ResultServiceToken = 'ResultServiceFactory';

export function resultServiceInjector(i: any) {
  return i.get(ResultServiceToken);
}

export const ResultService: FactoryProvider = {
  provide: ResultServiceToken,
  useFactory: resultServiceInjector,
  deps: ['$injector']
};
