import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'angular';
import { UpgradeModule } from '@angular/upgrade/static';
import { AppComponent } from "./test/AppComponent";
import { AngularJSComponent } from "./test/AngularJsComponent";
import { AngularComponent } from "./test/AngularComponent";
import { AppJsModule } from "./AppJsModule";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    AngularJSComponent,
    AngularComponent
  ],
  entryComponents: [
    AppComponent,
    AngularComponent
  ],
  imports: [
    BrowserModule,
    UpgradeModule,
    RouterModule,
  ],
  providers: [
    {provide: '$scope', useExisting: '$rootScope'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private upgrade: UpgradeModule) {
    this.upgrade.bootstrap(document.body, [AppJsModule.name]);
  }
}
