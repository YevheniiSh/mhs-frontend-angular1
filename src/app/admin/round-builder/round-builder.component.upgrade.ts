import { Directive, ElementRef, Injector, Input } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
import { upgradeDirective } from '../../template.loader';

@Directive({
  selector: 'round-builder',
})
export class RoundBuilderComponentUpgrade extends UpgradeComponent {
  @Input() rounds;

  constructor(elementRef: ElementRef, injector: Injector) {
    super('roundBuilder', elementRef, injector);
  }
}

upgradeDirective('mhs.admin', 'roundBuilder');
