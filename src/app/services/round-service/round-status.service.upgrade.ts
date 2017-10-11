import { FactoryProvider } from '@angular/core';

const RoundStatusServiceToken = 'RoundStatusService';

export function roundStatusServiceInjector(i: any) {
  return i.get(RoundStatusServiceToken);
}

export const RoundStatusService: FactoryProvider = {
  provide: RoundStatusServiceToken,
  useFactory: roundStatusServiceInjector,
  deps: ['$injector']
};
