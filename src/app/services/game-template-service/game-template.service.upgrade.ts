import { FactoryProvider } from '@angular/core';

const GameTemplateServiceToken = 'gameTemplateServiceFactory';

export function gameTemplateServiceInjector(i: any) {
  return i.get(GameTemplateServiceToken);
}

export const GameTemplateService: FactoryProvider = {
  provide: GameTemplateServiceToken,
  useFactory: gameTemplateServiceInjector,
  deps: ['$injector']
};
