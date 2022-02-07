import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionItemDirective } from './directives/accordion-item.directive';
import { AccordionContentDirective } from './directives/accordion-content.directive';
import { AccordionTitleDirective } from './directives/accordion-title.directive';
import { AccordionHeaderDirective } from './directives/accordion-header.directive';
import { AccordionComponent } from './accordion.component';



@NgModule({
  declarations: [
    AccordionItemDirective,
    AccordionContentDirective,
    AccordionTitleDirective,
    AccordionHeaderDirective,
    AccordionComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AccordionComponent,
  ]
})
export class AccordionModule { }
