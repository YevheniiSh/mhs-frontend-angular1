import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'ng2-toastr';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpgradeModule } from '@angular/upgrade/static';
import { environment } from '../environments/environment';

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
import { CustomConfirmationService } from './services/confirmation-service/confirmation.service';
import { CaptainRoundTypeComponent } from './admin/round-type/captain-round-type/captain-round-type.component';
import { HintRoundTypeComponent } from './admin/round-type/hint-round-type/hint-round-type.component';
import { SwitcherComponent } from './admin/round-type/hint-round-type/switcher/switcher.component';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from './admin/confirm/confirm.component';
import { ResultService } from './services/result-service/result.service.upgrade';
import { AngularJsProvider } from './hybrid/AngularJsProvider';
import { TeamService } from './services/team-service/team.service.upgrade';
import { InternationalisationService } from './internalisation/internalisation.upgrade';
import { GameService } from './services/game-service/game.service.upgrade';
import { UserAuthService } from './services/user-auth-service/user-auth.upgrade';
import { GameTemplateService } from './services/game-template-service/game-template.service.upgrade';
import { RoundTypeService } from './services/round-type-service/round-type.service.upgrade';
import { DowngradeProvider } from './hybrid/downgrade.provider';

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
    HintRoundTypeComponent,
    CaptainRoundTypeComponent,
    SwitcherComponent,
    ConfirmComponent,
    FacebookShareComponent
  ],
  imports: [
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
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
    UpgradeModule,
    AngularJsProvider.forRoot(),
    DowngradeProvider
  ],
  entryComponents: [
    ConfirmComponent,
    NavbarComponent,
    GameTemplateComponent,
    CurrentTemplateComponent,
    AuctionRoundTypeComponent,
    HintRoundTypeComponent,
    NotificationPanelComponent,
    FacebookShareComponent,
    ConfirmComponent,
    CaptainRoundTypeComponent,
    SwitcherComponent
  ],
  providers: [
    BackupService,
    LoginService,
    NotificationService,
    CustomConfirmationService,
    TeamService,
    InternationalisationService,
    UserAuthService,
    GameTemplateService,
    RoundTypeService,
    GameService,
    ResultService
  ]
})
export class HybridAppModule {

  constructor(private upgradeModule: UpgradeModule, private fb: FacebookService, private dp: DowngradeProvider) {
    this.initFacebook();
    this.dp.init(HybridAppModule, {
      defaultComponentAngularJsModule: 'mhs.admin',
      defaultProviderAngularJsModule: 'mhs.admin',
      componentPrefix: 'app'
    });
  }

  ngDoBootstrap() {
    this.upgradeModule.bootstrap(document.documentElement, ['mhs'], { strictDi: false });
  }

  private initFacebook() {
    console.log('fb init');
    this.fb.init({
      appId: environment.facebookAppId,
      xfbml: true,
      version: 'v2.10'
    });
  }
}


