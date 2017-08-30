import { Component, Inject } from '@angular/core';

@Component({
  selector: 'phone-list',
  template: `
    <team-list></team-list>
    <li *ngFor="let hero of test">
      {{ hero.name }}
    </li>`
})
export class PhoneListComponent {
  TeamServiceFactory;
  test = 'test';

  constructor(@Inject('TeamServiceFactory') TeamServiceFactory) {
    this.TeamServiceFactory = TeamServiceFactory;
    this.f();
  }

  f() {
    this.TeamServiceFactory
      .getAllTeams()
      .then((res) => {
        this.test = res;
      })
  }
}
