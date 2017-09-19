import { Component, forwardRef, NgModule } from '@angular/core';
import { UpgradeAdapter } from '@angular/upgrade';
import { BrowserModule } from '@angular/platform-browser';

import { AppModule } from './app.module';

const upgradeAdapter = new UpgradeAdapter(forwardRef(() => HybridAppModule));

@Component({
  selector: 'app-mhs',
  template: `
    <div class="container">
      <!--<navbar ng-if="!presentationMode && !loading"></navbar>-->
      <div ng-show="!loading" ng-view></div>
    </div>
  `,
})
export class OldAppComponent {
}

@NgModule({
  declarations: [
    OldAppComponent,
  ],
  imports: [
    BrowserModule,
    AppModule
  ],
  entryComponents: [],
  providers: [],
  bootstrap: [OldAppComponent]
})
export class HybridAppModule {

  constructor() {
    this.upgradeOldProviders();
  }

  ngDoBootstrap() {
    upgradeAdapter.bootstrap(document.documentElement, ['mhs'], {strictDi: false});
  }

  private upgradeOldProviders() {
    upgradeAdapter.upgradeNg1Provider('TeamServiceFactory');
  }
}


