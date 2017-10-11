import { ModuleWithProviders, NgModule } from '@angular/core';

const $translateToken = '$translate';
const $routeParamsToken = '$routeParams';
const $locationToken = '$location';
const $cssToken = '$css';

export function translateInjector(i: any) {
  return i.get($translateToken);
}

export function routeParamsInjector(i: any) {
  return i.get($routeParamsToken);
}

export function locationInjector(i: any) {
  return i.get($locationToken);
}

export function cssInjector(i: any) {
  return i.get($cssToken);
}

@NgModule()
export class AngularJsProvider {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AngularJsProvider,
      providers: [
        { provide: $translateToken, useFactory: translateInjector, deps: ['$injector'] },
        { provide: $routeParamsToken, useFactory: routeParamsInjector, deps: ['$injector'] },
        { provide: $locationToken, useFactory: locationInjector, deps: ['$injector'] },
        { provide: $cssToken, useFactory: cssInjector, deps: ['$injector'] },
      ]
    };
  }
}
