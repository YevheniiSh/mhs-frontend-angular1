import { FactoryProvider } from '@angular/core';

const GameServiceToken = 'GameServiceFactory';

export function gameServiceInjector(i: any) {
  return i.get(GameServiceToken);
}

export const GameService: FactoryProvider = {
  provide: GameServiceToken,
  useFactory: gameServiceInjector,
  deps: ['$injector']
};
