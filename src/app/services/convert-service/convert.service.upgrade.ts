import { FactoryProvider } from '@angular/core';

const ConvertServiceToken = 'convertServiceFactory';

export function convertServiceInjector(i: any) {
  return i.get(ConvertServiceToken);
}

export const ConvertService: FactoryProvider = {
  provide: ConvertServiceToken,
  useFactory: convertServiceInjector,
  deps: ['$injector']
};
