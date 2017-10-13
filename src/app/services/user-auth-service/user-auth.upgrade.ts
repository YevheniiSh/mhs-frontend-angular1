import { FactoryProvider } from '@angular/core';

const UserAuthServiceToken = 'userAuthService';

export function userAuthServiceInjector(i: any) {
  return i.get(UserAuthServiceToken);
}

export const UserAuthService: FactoryProvider = {
  provide: UserAuthServiceToken,
  useFactory: userAuthServiceInjector,
  deps: ['$injector']
};
