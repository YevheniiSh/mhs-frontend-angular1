import { BrowserModule } from '@angular/platform-browser';
import { Component, ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { PhoneListComponent } from './admin/phone-list.component';
import { TeamListComponentUpgrade } from './admin/team-list/team-list.component.upgrade';
import { HybridService } from './hybrid.service';
import { UpgradeModule } from '@angular/upgrade/static';

@Component({
  selector: 'app-mhs',
  template: `
    <router-outlet></router-outlet>
    <div class="container">
      <!--<navbar ng-if="!presentationMode && !loading"></navbar>-->
      <div ng-show="!loading" ng-view></div>
    </div>
  `,
})
export class OldAppComponent {
}

export function exportRepository(m: UpgradeModule): any {
  return m.$injector.get('TeamServiceFactory');
}

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
    RouterModule.forRoot([], {useHash: true, initialNavigation: false, enableTracing: true}),
    // RouterModule.forChild([
    //   { path: 'settings', children: [
    //     { path: '', component: PhoneListComponent },
    //     { path: 'pagesize', component: PhoneListComponent }
    //   ] },
    // ])
  ],
  entryComponents: [
    PhoneListComponent
  ],
  providers: [
    // {provide: UrlHandlingStrategy, useClass: Ng1Ng2UrlHandlingStrategy},
    {provide: 'TeamServiceFactory', useFactory: exportRepository, deps: [UpgradeModule]}
  ],
  bootstrap: [OldAppComponent]
})
export class AppModule {
  constructor(private resolver: ComponentFactoryResolver, public upgrade: UpgradeModule) {
    const hybridService = new HybridService(resolver, AppModule);
    hybridService.downgradeComponent('mhs.admin', {
      phoneList: PhoneListComponent,
    });
  }
}
