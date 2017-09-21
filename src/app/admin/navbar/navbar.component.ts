import {Component, Inject, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser;
  locale: String;
  public isCollapsed = true;
  i18nFactory;
  userAuthService;

  constructor(@Inject('InternationalisationServiceFactory') InternationalisationServiceFactory,
              @Inject('userAuthService') UserAuthService) {
    this.i18nFactory = InternationalisationServiceFactory;
    this.userAuthService = UserAuthService;
  }

  ngOnInit() {
    //Todo get current user
    this.userAuthService.currentUser().then((user) => {
      this.currentUser = user;
      console.log(this.userAuthService.user);

    });
    this.locale = this.i18nFactory.getLanguage();
  }

  changeLang(locale: String) {
    this.locale = locale;
    this.i18nFactory.changeLanguage(locale);
  }

}
