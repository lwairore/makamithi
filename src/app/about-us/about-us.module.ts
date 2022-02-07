import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutMainComponent } from './about-main/about-main.component';
import { APAbout4SectionComponent } from './sections/apabout4-section/apabout4-section.component';
import { SharedModule } from '../shared/shared.module';
import { FaqComponent } from './sections/faq/faq.component';
import { AccordionModule } from '../accordion/accordion.module';
import { ApWhatWeDo2SectionComponent } from './sections/ap-what-we-do2-section/ap-what-we-do2-section.component';
import { APTeam4SectionComponent } from './sections/apteam4-section/apteam4-section.component';
import { ClientSlider2Component } from './sections/client-slider2/client-slider2.component';
import { CarouselModule } from 'ngx-owl-carousel-o';


@NgModule({
  declarations: [
    AboutMainComponent,
    APAbout4SectionComponent,
    FaqComponent,
    ApWhatWeDo2SectionComponent,
    APTeam4SectionComponent,
    ClientSlider2Component,
  ],
  imports: [
    CommonModule,
    AboutUsRoutingModule,
    SharedModule,
    AccordionModule,
    CarouselModule,
  ]
})
export class AboutUsModule { }
