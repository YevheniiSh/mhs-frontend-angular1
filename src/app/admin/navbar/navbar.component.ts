import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase/app';
import { Downgrade } from '../../hybrid/downgrade';

@Downgrade()
@Component({
  selector: 'mhs-navbar',
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
  user: Observable<User>;

  @HostListener('document:click', ['$event'])
  click(event) {
    if (event.target.href) {
      this.isCollapsed = true;
    }
  }

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
