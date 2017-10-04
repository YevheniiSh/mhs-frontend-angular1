import { Directive, ElementRef, Injector, Input } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
  selector: 'round-builder',
})
export class RoundBuilderComponentUpgrade extends UpgradeComponent {
  @Input() rounds;

  constructor(elementRef: ElementRef, injector: Injector) {
    super('roundBuilder', elementRef, injector);
  }
}
