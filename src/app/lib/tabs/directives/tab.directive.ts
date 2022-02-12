import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[makPitTab]'
})
export class TabDirective {
  @Input() tabTitle = '';

  @Input() active = false;

  @Input() flaticon = '';

  @Input() className = 'react-tabs__tab';

  @Input() tabID: number | undefined;

  constructor(public templateRef: TemplateRef<any>) { }

}
