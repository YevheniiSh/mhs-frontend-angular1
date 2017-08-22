import { UpgradeComponent } from "@angular/upgrade/static";
import { Directive, ElementRef, Injector } from "@angular/core";

import 'angular';
import { AppJsModule } from "../AppJsModule";

@Directive({selector: 'angularjs-component'})
export class AngularJSComponent extends UpgradeComponent {
  constructor(ref: ElementRef, inj: Injector) {
    super('angularjsComponent', ref, inj);
  }
}

AppJsModule
  .component('angularjsComponent', {
    template: `
    <div style="background-color: lightcoral; padding: 10px; margin: 10px;">
      <h3>angularjsComponent written in AngularJS and upgraded to Angular</h3>
      <div>WORKS</div>
      <angular-component></angular-component>
    </div>
   `,
    controller: function ($routeParams) {
    }
  });
