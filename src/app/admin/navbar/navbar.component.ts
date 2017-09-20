import {Component, Inject, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser: boolean;
  locale: String;
  public isCollapsed = true;
  i18nFactory;

  constructor(@Inject('InternationalisationServiceFactory') InternationalisationServiceFactory) {
    this.i18nFactory = InternationalisationServiceFactory;
  }

  ngOnInit() {
    //Todo get current user
    this.currentUser = true;
    this.locale = this.i18nFactory.getLanguage();
  }

  changeLang(locale: String) {
    this.locale = locale;
    this.i18nFactory.changeLanguage(locale);
  }

}
