import { NgModule, Type } from '@angular/core';
import { HybridModule } from './hybrid.module';
import { DowngradeEntity } from './downgrade-component';

@NgModule()
export class DowngradeProvider {


  constructor(private hybridModule: HybridModule) {
  }

  forRoot(module: Type<any>): void {
    for (const a of Reflect.getMetadata('annotations', module)) {
      for (const b of a.declarations) {
        for (const c of Reflect.getMetadata('annotations', b)) {
          if (c.constructor.name === DowngradeEntity.name) {
            this.hybridModule.downgradeComponent('mhs.admin', b);
          }
        }
      }
      for (const d of a.providers) {
        const metadata = Reflect.getMetadata('annotations', d);
        if (metadata) {
          for (const m of metadata) {
            if (m.constructor.name === DowngradeEntity.name) {
              this.hybridModule.downgradeProvider('mhs.admin', d);
            }
          }
        }
      }
    }
  }
}
