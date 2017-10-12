import { FactoryProvider } from '@angular/core';

const InternationalisationServiceToken = 'InternationalisationServiceFactory';

export function internationalisationServiceInjector(i: any) {
  return i.get(InternationalisationServiceToken);
}

export const InternationalisationService: FactoryProvider = {
  provide: InternationalisationServiceToken,
  useFactory: internationalisationServiceInjector,
  deps: ['$injector']
};
