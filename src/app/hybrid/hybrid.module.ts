import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { downgradeComponent, downgradeInjectable } from '@angular/upgrade/static';

@NgModule()
export class HybridModule {
  constructor(private resolver: ComponentFactoryResolver) {
  }

  downgradeComponent(oldModuleName: string, component: any, prefix: string = 'app') {
    const oldModule = angular.module(oldModuleName);

    let name2 = component.name;
    let lastIndexOf = name2.lastIndexOf('Component');
    let s = name2.substring(0, lastIndexOf);
    let message = prefix + s;

    oldModule.directive(message, downgradeComponent({ component: this.resolver.resolveComponentFactory(component).componentType }));
  }

  downgradeProvider(oldModuleName: string, provider: any) {
    const oldModule = angular.module(oldModuleName);
    oldModule.service(provider.name, downgradeInjectable(provider));
  }

}
