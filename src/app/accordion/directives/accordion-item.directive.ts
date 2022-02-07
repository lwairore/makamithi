import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[makPitAccordionItem]'
})
export class AccordionItemDirective {
  @Input() title = '';

  @Input() disabled = false;

  constructor() { }

}
