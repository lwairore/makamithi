import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[makPitAccordionContent]'
})
export class AccordionContentDirective {

  constructor(
    public templateRef: TemplateRef<any>
  ) { }

}
