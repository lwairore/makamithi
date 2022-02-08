import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[makPitTab]'
})
export class TabDirective {
  @Input() tabTitle = '';

  @Input() active = false;

  @Input() flaticon = '';

  constructor(public templateRef: TemplateRef<any>) { }

}
