import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[makPitAccordionHeader]'
})
export class AccordionHeaderDirective {

  constructor(
    public templateRef: TemplateRef<any>
  ) { }

}
