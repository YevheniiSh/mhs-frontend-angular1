import { forwardRef, NgModule } from '@angular/core';
import { UpgradeAdapter } from '@angular/upgrade';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import * as angular from 'angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'ng2-toastr';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TeamListComponentUpgrade } from './admin/team-list/team-list.component.upgrade';
import { NavbarComponent } from './admin/navbar/navbar.component';
import { LoginPanelComponentUpgrade } from './admin/login-panel/login-panel.component.upgrade';
import { BackupService } from './services/backup/backup.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoginService } from './services/login-service/login.service';
import { firebaseConfig } from './services/firebase-service/firebase-config';
import { GameTemplateComponent } from './admin/game-template/game-template.component';
import { CurrentTemplateComponent } from './admin/game-template/current-template/current-template.component';
import { RoundBuilderComponentUpgrade } from './admin/round-builder/round-builder.component.upgrade';
import { AuctionRoundTypeComponent } from './admin/round-type/auction-round-type/auction-round-type.component';
import { OrderByPipe } from './pipe/order-by.pipe';
import { NotificationService } from './services/notification-service/notification.service';
import { NotificationPanelComponent } from './notification/notification-panel.component';
import { FacebookModule, FacebookService } from 'ngx-facebook';
import { FacebookShareComponent } from './facebook-share/facebook-share.component';
import { environment } from '../environments/environment';
import { CustomConfirmationService } from './services/confirmation-service/confirmation.service';
import { CaptainRoundTypeComponent } from './admin/round-type/captain-round-type/captain-round-type.component';
import { HintRoundTypeComponent } from './admin/round-type/hint-round-type/hint-round-type.component';
import { SwitcherComponent } from './admin/round-type/hint-round-type/switcher/switcher.component';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from './admin/confirm/confirm.component';

import { DatePickerComponent } from './admin/date-picker/date-picker.component';
import { TimePickerComponent } from './admin/time-picker/time-picker.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { SeasonPickerComponent } from './admin/season-picker/season-picker.component';
import { CreateGameComponent } from './admin/create-game/create-game.component';
import { EditGameComponent } from './admin/edit-game/edit-game.component';
import { defineLocale } from 'ngx-bootstrap/bs-moment';
import { enGb, ru } from 'ngx-bootstrap/locale';
import { uk } from './translations/uk';
import { GameSetupComponent } from './admin/game-setup/game-setup.component'

defineLocale('ru', ru);
defineLocale('en', enGb);
defineLocale('uk', uk);


const upgradeAdapter = new UpgradeAdapter(forwardRef(() => HybridAppModule));

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/app/translations/', '.json');
}

@NgModule({
  declarations: [
    TeamListComponentUpgrade,
    NavbarComponent,
    LoginPanelComponentUpgrade,
    NotificationPanelComponent,
    AuctionRoundTypeComponent,
    OrderByPipe,
    LoginPanelComponentUpgrade,
    RoundBuilderComponentUpgrade,
    GameTemplateComponent,
    CurrentTemplateComponent,
    CreateGameComponent,
    DatePickerComponent,
    TimePickerComponent,
    SeasonPickerComponent,
    EditGameComponent,
    HintRoundTypeComponent,
    CaptainRoundTypeComponent,
    SwitcherComponent,
    ConfirmComponent,
    FacebookShareComponent,
    GameSetupComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CollapseModule.forRoot(),
    TimepickerModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FacebookModule.forRoot(),
    BootstrapModalModule.forRoot({ container: document.body }),
    ClickOutsideModule,
  ],
  entryComponents: [ConfirmComponent],
  providers: [BackupService, LoginService, NotificationService, CustomConfirmationService]
})
export class HybridAppModule {
  private mhsAdminModule = angular.module('mhs.admin');

  constructor(private fb: FacebookService) {
    this.upgradeOldProviders();
    this.downgradeNewComponents();
    this.downgradeNewProviders();

    this.initFacebook();
  }

  ngDoBootstrap() {
    upgradeAdapter.bootstrap(document.documentElement, ['mhs'], { strictDi: false });
  }

  private upgradeOldProviders() {
    upgradeAdapter.upgradeNg1Provider('TeamServiceFactory');
    upgradeAdapter.upgradeNg1Provider('InternationalisationServiceFactory');
    upgradeAdapter.upgradeNg1Provider('userAuthService');
    upgradeAdapter.upgradeNg1Provider('$routeParams');
    upgradeAdapter.upgradeNg1Provider('$location');
    upgradeAdapter.upgradeNg1Provider('gameTemplateServiceFactory');
    upgradeAdapter.upgradeNg1Provider('roundTypeService');
    upgradeAdapter.upgradeNg1Provider('GameServiceFactory');
    upgradeAdapter.upgradeNg1Provider('$translate');
    upgradeAdapter.upgradeNg1Provider('ResultServiceFactory');
    upgradeAdapter.upgradeNg1Provider('convertServiceFactory');
    upgradeAdapter.upgradeNg1Provider('seasonService');
    upgradeAdapter.upgradeNg1Provider('OpenGameServiceFactory');
    upgradeAdapter.upgradeNg1Provider('gameBuildServiceFactory');

  }

  private downgradeNewComponents() {
    this.mhsAdminModule.directive('appNavbar', upgradeAdapter.downgradeNg2Component(NavbarComponent));
    this.mhsAdminModule.directive('appGameTemplate', upgradeAdapter.downgradeNg2Component(GameTemplateComponent));
    this.mhsAdminModule.directive('appCurrentTemplate', upgradeAdapter.downgradeNg2Component(CurrentTemplateComponent));
    this.mhsAdminModule.directive('appAuctionRoundType', upgradeAdapter.downgradeNg2Component(AuctionRoundTypeComponent));
    this.mhsAdminModule.directive('appHintRoundType', upgradeAdapter.downgradeNg2Component(HintRoundTypeComponent));
    this.mhsAdminModule.directive('notificationPanel', upgradeAdapter.downgradeNg2Component(NotificationPanelComponent));
    this.mhsAdminModule.directive('mhsFacebookShare', upgradeAdapter.downgradeNg2Component(FacebookShareComponent));
    this.mhsAdminModule.directive('appConfirmComponent', upgradeAdapter.downgradeNg2Component(ConfirmComponent));
    this.mhsAdminModule.directive('appCaptainRoundType', upgradeAdapter.downgradeNg2Component(CaptainRoundTypeComponent));
    this.mhsAdminModule.directive('appSwitcher', upgradeAdapter.downgradeNg2Component(SwitcherComponent));
    this.mhsAdminModule.directive('appCreateGame', upgradeAdapter.downgradeNg2Component(CreateGameComponent));
    this.mhsAdminModule.directive('appEditGame', upgradeAdapter.downgradeNg2Component(EditGameComponent));

  }

  private downgradeNewProviders() {
    this.mhsAdminModule.service('backup', upgradeAdapter.downgradeNg2Provider(BackupService));
    this.mhsAdminModule.service('login', upgradeAdapter.downgradeNg2Provider(LoginService));
    this.mhsAdminModule.service('NotificationService', upgradeAdapter.downgradeNg2Provider(NotificationService));
    this.mhsAdminModule.service('CustomConfirmationService', upgradeAdapter.downgradeNg2Provider(CustomConfirmationService));
  }

  private initFacebook() {
    this.fb.init({
      appId: environment.facebookAppId,
      xfbml: true,
      version: 'v2.10'
    });
  }
}


