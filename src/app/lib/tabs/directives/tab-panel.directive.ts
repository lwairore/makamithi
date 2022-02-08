import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[makPitTabPanel]'
})
export class TabPanelDirective {
  @Input() className = '';

  @Input() isSelected = false;

  constructor(public templateRef: TemplateRef<any>) { }

}
