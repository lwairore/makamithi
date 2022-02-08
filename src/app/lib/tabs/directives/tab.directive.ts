import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[makPitTab]'
})
export class TabDirective {
  @Input() tabTitle = '';

  constructor() { }

}
