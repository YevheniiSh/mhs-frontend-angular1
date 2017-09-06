import { Directive, ElementRef, Injector } from "@angular/core";
import { UpgradeComponent } from "@angular/upgrade/static";
import { upgradeDirective } from "./template.loader";

@Directive({
  selector: 'team-list',
})
export class HeroDetailDirective extends UpgradeComponent {
  constructor(elementRef: ElementRef, injector: Injector) {
    super('teamList', elementRef, injector);
  }
}

upgradeDirective('mhs.admin', 'teamList');
