import { NgModule, Type } from '@angular/core';
import { HybridHelper } from './hybrid.helper';
import { DowngradeEntity } from './downgrade';

declare let Reflect: any;

export interface DowngradeProviderConfig {
  defaultComponentAngularJsModule: string;
  defaultProviderAngularJsModule: string;
  componentPrefix: string;
}

interface DownedEntity {
  downgradeDecorator: DowngradeEntity;
  originalEntity: any;
}

@NgModule({
  imports: [HybridHelper]
})
export class DowngradeProvider {
  constructor(private hybridModule: HybridHelper) {
  }

  private DowngradeType = {
    COMPONENT: this.hybridModule.downgradeComponent.bind(this.hybridModule),
    PROVIDER: this.hybridModule.downgradeProvider.bind(this.hybridModule)
  };

  init(module: Type<any>, config: DowngradeProviderConfig): void {
    this.hybridModule.componentPrefix = config.componentPrefix;

    for (const classDecorator of Reflect.getMetadata('annotations', module)) {
      this.downgradeDeclarations(classDecorator.declarations, config);
      this.downgradeProviders(classDecorator.providers, config);
    }
  }

  private downgradeProviders(providers, config: DowngradeProviderConfig) {
    this.downgrade(
      this.getDownedEntities(providers),
      config.defaultProviderAngularJsModule,
      this.DowngradeType.PROVIDER
    );
  }

  private downgradeDeclarations(declarations, config: DowngradeProviderConfig) {
    this.downgrade(
      this.getDownedEntities(declarations),
      config.defaultComponentAngularJsModule,
      this.DowngradeType.COMPONENT
    );
  }

  private downgrade(downedEntities: DownedEntity[], moduleName, downgradeWorker) {
    downedEntities.forEach(downedEntity => {
      downgradeWorker(downedEntity.downgradeDecorator.module || moduleName, downedEntity.originalEntity);
    });
  }

  private getDownedEntities(entities): DownedEntity[] {
    const res = [];
    for (const entity of entities) {
      const entityDecorators = Reflect.getMetadata('annotations', entity);
      if (entityDecorators) {
        for (const decorator of entityDecorators) {
          if (decorator.constructor.name === DowngradeEntity.name) {
            res.push({ downgradeDecorator: decorator, originalEntity: entity });
          }
        }
      }
    }
    return res;
  }

}
