import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[makPitAccordionTitle]'
})
export class AccordionTitleDirective {

  constructor(
    public templateRef: TemplateRef<any>
  ) { }

}
