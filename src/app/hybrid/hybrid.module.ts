import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { downgradeComponent } from '@angular/upgrade/static';

@NgModule()
export class HybridModule {
  constructor(private resolver: ComponentFactoryResolver) {
  }

  downgradeComponents(oldModuleName: string, components: object) {
    const oldModule = angular.module(oldModuleName);

    Object.keys(components).forEach(componentName => {
      oldModule.directive(componentName,
        downgradeComponent({ component: this.resolver.resolveComponentFactory(components[componentName]).componentType })
      );
    });
  }

}
