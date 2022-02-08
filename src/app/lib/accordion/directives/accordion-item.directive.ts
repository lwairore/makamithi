import { ContentChild, Directive, Input } from '@angular/core';
import { AccordionContentDirective } from './accordion-content.directive';
import { AccordionHeaderDirective } from './accordion-header.directive';
import { AccordionTitleDirective } from './accordion-title.directive';

@Directive({
  selector: 'makPitAccordionItem'
})
export class AccordionItemDirective {
  @Input() title = '';

  @Input() disabled = false;

  @ContentChild(AccordionContentDirective)
  content: AccordionContentDirective | undefined;

  @ContentChild(AccordionTitleDirective)
  customTitle: AccordionTitleDirective | undefined;

  @ContentChild(AccordionHeaderDirective)
  customHeader: AccordionHeaderDirective | undefined;

  constructor() { }

}
