import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionItemDirective } from './directives/accordion-item.directive';
import { AccordionContentDirective } from './directives/accordion-content.directive';



@NgModule({
  declarations: [AccordionItemDirective, AccordionContentDirective],
  imports: [
    CommonModule
  ]
})
export class AccordionModule { }
