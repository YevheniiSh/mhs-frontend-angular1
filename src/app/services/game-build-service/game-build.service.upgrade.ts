import { FactoryProvider } from '@angular/core';

const GameBuildServiceToken = 'gameBuildServiceFactory';

export function gameBuildServiceInjector(i: any) {
  return i.get(GameBuildServiceToken);
}

export const GameBuildService: FactoryProvider = {
  provide: GameBuildServiceToken,
  useFactory: gameBuildServiceInjector,
  deps: ['$injector']
};
