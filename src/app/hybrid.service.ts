import { ComponentFactoryResolver, forwardRef, Type } from '@angular/core';
import { UpgradeAdapter } from '@angular/upgrade';

import * as angular from 'angular';

export class HybridService {

  constructor(private resolver: ComponentFactoryResolver, private module: Type<any>) {
  }

  private upgradeAdapter = new UpgradeAdapter(forwardRef(() => this.module));

  downgradeComponent(oldModuleName: string, components: object) {
    const oldModule = angular.module(oldModuleName);

    Object.keys(components).forEach(componentName => {
      oldModule.directive(componentName,
        this.upgradeAdapter.downgradeNg2Component(this.resolver.resolveComponentFactory(components[componentName]).componentType)
      );
    });
  }

}
