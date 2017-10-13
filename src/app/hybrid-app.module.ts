import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'ng2-toastr';
import { CollapseModule } from 'ngx-bootstrap-base/dist/collapse';
import { BsDropdownModule } from 'ngx-bootstrap-base/dist/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap-base/dist/datepicker';
import { TimepickerModule } from 'ngx-bootstrap-base/dist/timepicker';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpgradeModule } from '@angular/upgrade/static';

import { TeamListComponentUpgrade } from './admin/team-list/team-list.component.upgrade';
import { NavbarComponent } from './admin/navbar/navbar.component';
import { LoginPanelComponentUpgrade } from './admin/login-panel/login-panel.component.upgrade';
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
import { CustomConfirmationService } from './services/confirmation-service/confirmation.service';
import { CaptainRoundTypeComponent } from './admin/round-type/captain-round-type/captain-round-type.component';
import { HintRoundTypeComponent } from './admin/round-type/hint-round-type/hint-round-type.component';
import { SwitcherComponent } from './admin/round-type/hint-round-type/switcher/switcher.component';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from './admin/confirm/confirm.component';
import { ResultService } from './services/result-service/result.service.upgrade';
import { AngularJsProvider } from './hybrid/angular-js.provider';
import { TeamService } from './services/team-service/team.service.upgrade';
import { InternationalisationService } from './internalisation/internalisation.upgrade';
import { GameService } from './services/game-service/game.service.upgrade';
import { UserAuthService } from './services/user-auth-service/user-auth.upgrade';
import { GameTemplateService } from './services/game-template-service/game-template.service.upgrade';
import { RoundTypeService } from './services/round-type-service/round-type.service.upgrade';
import { DowngradeModule } from './hybrid/downgrade.module';
import { environment } from '../environments/environment';
import { TranslateService } from './services/translate-service/translate.service.upgrade';
import { FacebookModule, FacebookService } from 'ngx-facebook';
import { FacebookShareComponent } from './facebook-share/facebook-share.component';
import { GameProgressComponent } from './admin/game-progress/game-progress.component';
import { RoundPanelComponent } from './admin/game-progress/round-panel/round-panel.component';
import { BackupDirective } from './shared/backup.directive';

import { DatePickerComponent } from './admin/date-picker/date-picker.component';
import { TimePickerComponent } from './admin/time-picker/time-picker.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { SeasonPickerComponent } from './admin/season-picker/season-picker.component';
import { CreateGameComponent } from './admin/create-game/create-game.component';
import { EditGameComponent } from './admin/edit-game/edit-game.component';
import { defineLocale } from 'ngx-bootstrap-base/dist/bs-moment';
import { enGb, ru, uk } from 'ngx-bootstrap-base/dist/locale';
import { GameSetupComponent } from './admin/game-setup/game-setup.component';
import { PrivateGameComponent } from './admin/private-game/private-game.component';
import { OpenGameService } from './services/game-service/open-game-service/open-game.service.upgrade';
import { SeasonService } from './services/season-service/season.service.upgrade';
import { ConvertService } from './services/convert-service/convert.service.upgrade';
import { GameBuildService } from './services/game-build-service/game-build.service.upgrade';
import { RoundStatusService } from './services/round-service/round-status.service.upgrade';
import { AttachmentComponent } from './admin/attachment/attachment.component';
import { AttachmentService } from './services/attachment-service/attachment.service';

defineLocale('ru', ru);
defineLocale('en', enGb);
defineLocale('uk', uk);


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
    PrivateGameComponent,
    RoundPanelComponent,
    BackupDirective,
    GameSetupComponent,
    GameProgressComponent,
    AttachmentComponent
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
    UpgradeModule,
    AngularJsProvider.forRoot(),
    DowngradeModule,
    ClickOutsideModule,
  ],
  entryComponents: [
    ConfirmComponent,
    NavbarComponent,
    GameTemplateComponent,
    CurrentTemplateComponent,
    AuctionRoundTypeComponent,
    HintRoundTypeComponent,
    NotificationPanelComponent,
    ConfirmComponent,
    CaptainRoundTypeComponent,
    SwitcherComponent,
    FacebookShareComponent,
    CreateGameComponent,
    SeasonPickerComponent,
    EditGameComponent,
    GameProgressComponent,
    AttachmentComponent
  ],
  providers: [
    LoginService,
    NotificationService,
    CustomConfirmationService,
    TeamService,
    InternationalisationService,
    UserAuthService,
    GameTemplateService,
    RoundTypeService,
    GameService,
    ResultService,
    TranslateService,
    OpenGameService,
    SeasonService,
    ConvertService,
    GameBuildService,
    RoundStatusService,
    AttachmentService,
  ],
})
export class HybridAppModule {

  constructor(private upgradeModule: UpgradeModule, private fb: FacebookService, private dp: DowngradeModule) {
    this.initFacebook();
    this.dp.init(HybridAppModule, {
      defaultAngularJsModuleForComponents: 'mhs.admin',
      defaultAngularJsModuleForProviders: 'mhs.admin',
      componentPrefix: 'mhs'
    });
  }

  ngDoBootstrap() {
    this.upgradeModule.bootstrap(document.documentElement, ['mhs'], { strictDi: false });
  }

  private initFacebook() {
    this.fb.init({
      appId: environment.facebookAppId,
      xfbml: true,
      version: 'v2.10'
    });
  }
}


