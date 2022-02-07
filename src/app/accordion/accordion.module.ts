import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionItemDirective } from './directives/accordion-item.directive';



@NgModule({
  declarations: [AccordionItemDirective],
  imports: [
    CommonModule
  ]
})
export class AccordionModule { }
