import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutMainComponent } from './about-main/about-main.component';
import { APAbout4SectionComponent } from './sections/apabout4-section/apabout4-section.component';
import { SharedModule } from '../shared/shared.module';
import { FaqComponent } from './sections/faq/faq.component';
import { AccordionComponent } from './sections/accordion/accordion.component';


@NgModule({
  declarations: [
    AboutMainComponent,
    APAbout4SectionComponent,
    FaqComponent,
    AccordionComponent,
  ],
  imports: [
    CommonModule,
    AboutUsRoutingModule,
    SharedModule,
  ]
})
export class AboutUsModule { }
