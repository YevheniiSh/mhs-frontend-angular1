import { FactoryProvider } from '@angular/core';

const RoundTypeServiceToken = 'roundTypeService';

export function roundTypeServiceInjector(i: any) {
  return i.get(RoundTypeServiceToken);
}

export const RoundTypeService: FactoryProvider = {
  provide: RoundTypeServiceToken,
  useFactory: roundTypeServiceInjector,
  deps: ['$injector']
};
