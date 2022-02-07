import { ContentChild, Directive, Input } from '@angular/core';
import { AccordionContentDirective } from './accordion-content.directive';

@Directive({
  selector: '[makPitAccordionItem]'
})
export class AccordionItemDirective {
  @Input() title = '';

  @Input() disabled = false;

  @ContentChild(AccordionContentDirective)
  content: AccordionContentDirective | undefined;

  constructor() { }

}
