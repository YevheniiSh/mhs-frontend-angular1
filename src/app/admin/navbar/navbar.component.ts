import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser: boolean;
  locale: String;
  public isCollapsed = true;

  constructor() {
  }

  ngOnInit() {
    this.currentUser = true;
    this.locale = "ru";
  }

  changeLang(locale: String) {
    this.locale = locale;
  }

}
