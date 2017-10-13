import { FactoryProvider } from '@angular/core';

const TeamServiceToken = 'TeamServiceFactory';

export function teamServiceInjector(i: any) {
  return i.get(TeamServiceToken);
}

export const TeamService: FactoryProvider = {
  provide: TeamServiceToken,
  useFactory: teamServiceInjector,
  deps: ['$injector']
};
