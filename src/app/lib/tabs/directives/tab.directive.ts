import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[makPitTab]'
})
export class TabDirective {
  @Input() tabTitle = '';

  @Input() active = false;

  @Input() flaticon = '';

  constructor() { }

}
