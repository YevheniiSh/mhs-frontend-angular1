import { BrowserModule } from '@angular/platform-browser';
import { forwardRef, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { PhoneListComponent } from './admin/phone-list.component';
import { UpgradeAdapter } from "@angular/upgrade";
import * as angular from 'angular';
import { HeroDetailDirective } from "./teamlist";

const adapter = new UpgradeAdapter(forwardRef(() => AppModule));

@NgModule({
  declarations: [
    PhoneListComponent,
    HeroDetailDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
  ],
  entryComponents: [],
  providers: [],
})
export class AppModule {
  constructor() {
    adapter.upgradeNg1Provider('TeamServiceFactory');
  }

  ngDoBootstrap() {
    adapter.bootstrap(document.documentElement, ['mhs'], {strictDi: false});
  }
}

const mhsAdminModule = angular.module('mhs.admin');

mhsAdminModule.directive('phoneList', adapter.downgradeNg2Component(PhoneListComponent));
