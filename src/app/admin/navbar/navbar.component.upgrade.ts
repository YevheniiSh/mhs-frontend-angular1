import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
import { upgradeDirective } from '../../template.loader';

@Directive({
  selector: 'navbar',
})
export class NavbarComponentUpgrade extends UpgradeComponent {
  constructor(elementRef: ElementRef, injector: Injector) {
    super('navbar', elementRef, injector);
  }
}

upgradeDirective('navbar', 'navbar');
