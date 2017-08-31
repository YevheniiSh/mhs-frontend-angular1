import { BrowserModule } from '@angular/platform-browser';
import { forwardRef, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { PhoneListComponent } from './admin/phone-list.component';
import { UpgradeAdapter } from "@angular/upgrade";
import * as angular from 'angular';

const adapter = new UpgradeAdapter(forwardRef(() => AppModule));

@NgModule({
  declarations: [
    PhoneListComponent,
    adapter.upgradeNg1Component('teamList')
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
  ],
  entryComponents: [
    PhoneListComponent
  ],
  providers: [],
})
export class AppModule {
  constructor() {
    adapter.upgradeNg1Provider('TeamServiceFactory');
  }

  ngDoBootstrap() {
    adapter.bootstrap(document.documentElement, ['mhs']);
  }
}

const mhsAdminModule = angular.module('mhs.admin');

mhsAdminModule.directive('phoneList', adapter.downgradeNg2Component(PhoneListComponent));
