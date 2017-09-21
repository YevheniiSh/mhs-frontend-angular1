import { BrowserModule } from '@angular/platform-browser';
import { Component, ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, UrlHandlingStrategy } from '@angular/router';
import { PhoneListComponent } from './admin/phone-list.component';
import { TeamListComponentUpgrade } from './admin/team-list/team-list.component.upgrade';
import { HybridService } from './hybrid.service';
import { UpgradeModule } from '@angular/upgrade/static';
import { Ng1Ng2UrlHandlingStrategy } from './Ng1Ng2UrlHandlingStrategy';
import { APP_BASE_HREF, HashLocationStrategy, LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-mhs',
  template: `
    <router-outlet></router-outlet>
    <div class="container">
      <div ng-show="!loading" ng-view></div>
    </div>
  `,
})
export class OldAppComponent {
}

export function exportRepository(m: any): any {
  // return m.$injector.get('TeamServiceFactory');
  return m.get('TeamServiceFactory');
}

const routes: Routes = [
  { path: '', redirectTo: 'games', pathMatch: 'full' },
  { path: 'phones', component: PhoneListComponent },
];

@NgModule({
  declarations: [
    OldAppComponent,
    PhoneListComponent,
    TeamListComponentUpgrade,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    UpgradeModule,
    RouterModule.forRoot(routes, { initialNavigation: false, enableTracing: true })
    // RouterModule.forRoot(routes)
  ],
  entryComponents: [
    PhoneListComponent,
    OldAppComponent
  ],
  providers: [
    { provide: '$scope', useExisting: '$rootScope' },
    { provide: APP_BASE_HREF, useValue: '!' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: UrlHandlingStrategy, useClass: Ng1Ng2UrlHandlingStrategy },
    { provide: 'TeamServiceFactory', useFactory: exportRepository, deps: ['$injector'] },
  ],
  bootstrap: [OldAppComponent]
})
export class AppModule {
  constructor(private resolver: ComponentFactoryResolver, public upgrade: UpgradeModule) {
    //todo hs as DI
    const hybridService = new HybridService(resolver, AppModule);
    hybridService.downgradeComponent('mhs.admin', {
      phoneList: PhoneListComponent,
    });
  }
}
