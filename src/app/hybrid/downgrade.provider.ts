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
  originalEntity: Type<any>;
}

@NgModule({
  imports: [HybridHelper]
})
export class DowngradeProvider {
  constructor(private hybridHelper: HybridHelper) {
  }

  private DowngradeType = {
    COMPONENT: this.hybridHelper.downgradeComponent.bind(this.hybridHelper),
    PROVIDER: this.hybridHelper.downgradeProvider.bind(this.hybridHelper)
  };

  init(module: Type<any>, config: DowngradeProviderConfig): void {
    this.hybridHelper.componentPrefix = config.componentPrefix;

    for (const classDecorator of Reflect.getMetadata('annotations', module)) {
      this.downgrade(
        this.getDownedEntities(classDecorator.providers),
        config.defaultProviderAngularJsModule,
        this.DowngradeType.PROVIDER
      );

      this.downgrade(
        this.getDownedEntities(classDecorator.declarations),
        config.defaultComponentAngularJsModule,
        this.DowngradeType.COMPONENT
      );
    }
  }

  private downgrade(downedEntities: DownedEntity[], moduleName, downgradeWorker) {
    downedEntities.forEach(downedEntity => {
      downgradeWorker(downedEntity.downgradeDecorator.module || moduleName, downedEntity.originalEntity);
    });
  }

  private getDownedEntities(entities): DownedEntity[] {
    const res: DownedEntity[] = [];
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
