import { Directive, ElementRef, Injector } from "@angular/core";
import { UpgradeComponent } from "@angular/upgrade/static";

@Directive({
  selector: 'team-list',
})
export class TeamListComponentUpgrade extends UpgradeComponent {
  constructor(elementRef: ElementRef, injector: Injector) {
    super('teamList', elementRef, injector);
  }
}
