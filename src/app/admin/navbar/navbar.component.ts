import { Component, Inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser;
  locale: string;
  public isCollapsed = true;
  i18nFactory;
  userAuthService;
  translate: TranslateService;
  user: Observable<firebase.User>;

  constructor(@Inject('InternationalisationServiceFactory') InternationalisationServiceFactory,
              @Inject('userAuthService') UserAuthService,
              translate: TranslateService,
              public afAuth: AngularFireAuth) {
    this.i18nFactory = InternationalisationServiceFactory;
    this.userAuthService = UserAuthService;
    this.translate = translate;
    this.user = afAuth.authState;
  }

  ngOnInit() {
    this.userAuthService.currentUser().then((user) => {
      this.currentUser = user;
      console.log(this.userAuthService.user);

    });
    this.locale = this.i18nFactory.getLanguage();
    this.translate.use(this.locale);
  }

  changeLang(locale: string) {
    this.locale = locale;
    this.i18nFactory.changeLanguage(locale);
    this.translate.use(locale);
  }

}
