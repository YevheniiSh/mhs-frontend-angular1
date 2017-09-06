import { forwardRef, NgModule } from "@angular/core";
import { UpgradeAdapter } from "@angular/upgrade";
import { BrowserModule } from "@angular/platform-browser";
import { PhoneListComponent } from "./admin/phone-list.component";
import * as angular from 'angular';
import { AppModule } from "./app.module";
import { TeamListComponentUpgrade } from "./admin/team-list/team-list.component.upgrade";

const upgradeAdapter = new UpgradeAdapter(forwardRef(() => HybridAppModule));

@NgModule({
  declarations: [
    TeamListComponentUpgrade,
    PhoneListComponent
  ],
  imports: [
    BrowserModule,
    AppModule
  ],
  entryComponents: [],
  providers: [],
})
export class HybridAppModule {

  constructor() {
    this.upgradeOldProviders();
    this.downgradeNewComponents();
  }

  ngDoBootstrap() {
    upgradeAdapter.bootstrap(document.documentElement, ['mhs'], {strictDi: false});
  }

  private upgradeOldProviders() {
    upgradeAdapter.upgradeNg1Provider('TeamServiceFactory');
  }

  private downgradeNewComponents() {
    const mhsAdminModule = angular.module('mhs.admin');

    mhsAdminModule.directive('phoneList', upgradeAdapter.downgradeNg2Component(PhoneListComponent));
  }
}


