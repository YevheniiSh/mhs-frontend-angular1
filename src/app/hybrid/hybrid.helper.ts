import { ComponentFactoryResolver, NgModule, Type } from '@angular/core';
import { downgradeComponent, downgradeInjectable } from '@angular/upgrade/static';

@NgModule()
export class HybridHelper {
  constructor(private resolver: ComponentFactoryResolver) {
  }

  private _componentPrefix;

  set componentPrefix(value: string) {
    this._componentPrefix = value;
  }

  downgradeComponent(oldModuleName: string, component: Type<any>) {
    const oldModule = angular.module(oldModuleName);
    const componentName = this.getComponentName(component);
    oldModule.directive(componentName, downgradeComponent({ component: this.resolver.resolveComponentFactory(component).componentType }));
  }

  downgradeProvider(oldModuleName: string, provider: Type<any>) {
    const oldModule = angular.module(oldModuleName);
    oldModule.service(provider.name, downgradeInjectable(provider));
  }

  private getComponentName(component: Type<any>) {
    const componentFullName = component.name;
    const postfixIndexOf = componentFullName.lastIndexOf('Component');
    const componentNameWithoutPostfix = componentFullName.substring(0, postfixIndexOf);
    return this._componentPrefix + componentNameWithoutPostfix;
  }
}
