import { FactoryProvider } from '@angular/core';

const OpenGameServiceToken = 'OpenGameServiceFactory';

export function openGameServiceInjector(i: any) {
  return i.get(OpenGameServiceToken);
}

export const OpenGameService: FactoryProvider = {
  provide: OpenGameServiceToken,
  useFactory: openGameServiceInjector,
  deps: ['$injector']
};
