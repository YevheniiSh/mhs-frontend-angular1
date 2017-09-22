import { forwardRef, NgModule } from '@angular/core';
import { UpgradeAdapter } from '@angular/upgrade';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import * as angular from 'angular';

import { AppModule } from './app.module';
import { TeamListComponentUpgrade } from './admin/team-list/team-list.component.upgrade';
import { NavbarComponent } from './admin/navbar/navbar.component';
import { LoginPanelComponentUpgrade } from './admin/login-panel/login-panel.component.upgrade';
import { BackupService } from './services/backup/backup.service';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoginService } from './services/login-service/login.service';
import { firebaseConfig } from './services/firebase-service/firebase-config';

const upgradeAdapter = new UpgradeAdapter(forwardRef(() => HybridAppModule));

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/app/translations/', '.json');
}

@NgModule({
  declarations: [
    TeamListComponentUpgrade,
    NavbarComponent,
    LoginPanelComponentUpgrade
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppModule
  ],
  entryComponents: [],
  providers: [BackupService, LoginService],
})
export class HybridAppModule {
  private mhsAdminModule = angular.module('mhs.admin');

  constructor() {
    this.upgradeOldProviders();
    this.downgradeNewComponents();
    this.downgradeNewProviders();
  }

  ngDoBootstrap() {
    upgradeAdapter.bootstrap(document.documentElement, ['mhs'], { strictDi: false });
  }

  private upgradeOldProviders() {
    upgradeAdapter.upgradeNg1Provider('TeamServiceFactory');
    upgradeAdapter.upgradeNg1Provider('InternationalisationServiceFactory');
    upgradeAdapter.upgradeNg1Provider('userAuthService');
  }

  private downgradeNewComponents() {
    this.mhsAdminModule.directive('appNavbar', upgradeAdapter.downgradeNg2Component(NavbarComponent));
  }

  private downgradeNewProviders() {
    this.mhsAdminModule.service('backup', upgradeAdapter.downgradeNg2Provider(BackupService));
    this.mhsAdminModule.service('login', upgradeAdapter.downgradeNg2Provider(LoginService));
  }
}


