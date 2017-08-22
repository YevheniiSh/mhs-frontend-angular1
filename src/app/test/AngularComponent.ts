import { downgradeComponent } from "@angular/upgrade/static";
import { Component } from "@angular/core";
import { AppJsModule } from "../AppJsModule";

@Component({
  selector: 'angular-component',
  template: `
    <div style="background-color: lightgreen; padding: 10px; margin: 10px;">
      <h3>AngularComponent written in Angular and downgraded to AngularJS</h3>
      <div>
        <ng-content></ng-content>
      </div>
      <div>WORKS</div>
      <div>
      </div>
    </div>
  `
})
export class AngularComponent {
}

AppJsModule.directive('angularComponent', downgradeComponent({component: AngularComponent}));
