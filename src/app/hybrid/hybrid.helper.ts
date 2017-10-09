import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { downgradeComponent, downgradeInjectable } from '@angular/upgrade/static';

@NgModule()
export class HybridHelper {
  constructor(private resolver: ComponentFactoryResolver) {
  }

  private _componentPrefix;

  set componentPrefix(value: string) {
    this._componentPrefix = value;
  }

  downgradeComponent(oldModuleName: string, component: any) {
    const oldModule = angular.module(oldModuleName);

    const componentFullName = component.name;
    const postfixIndexOf = componentFullName.lastIndexOf('Component');
    const componentNameWithoutPostfix = componentFullName.substring(0, postfixIndexOf);
    const componentName = this._componentPrefix + componentNameWithoutPostfix;

    oldModule.directive(componentName, downgradeComponent({ component: this.resolver.resolveComponentFactory(component).componentType }));
  }

  downgradeProvider(oldModuleName: string, provider: any) {
    const oldModule = angular.module(oldModuleName);
    oldModule.service(provider.name, downgradeInjectable(provider));
  }
}
