import {Directive, ElementRef, Injector} from "@angular/core";
import {UpgradeComponent} from "@angular/upgrade/static";
import {upgradeDirective} from "../../template.loader";

@Directive({
  selector: 'login-panel',
})
export class LoginPanelComponentUpgrade extends UpgradeComponent {
  constructor(elementRef: ElementRef, injector: Injector) {
    super('loginPanel', elementRef, injector);
  }
}

upgradeDirective('mhs.admin', 'loginPanel');
