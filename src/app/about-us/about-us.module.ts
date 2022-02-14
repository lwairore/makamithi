import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutMainComponent } from './about-main/about-main.component';
import { APAbout4SectionComponent } from './about-main/sections/apabout4-section/apabout4-section.component';
import { SharedModule } from '@sharedModule/shared.module';
import { FaqComponent } from './about-main/sections/faq/faq.component';
import { AccordionModule } from '../lib/accordion/accordion.module';
import { ApWhatWeDo2SectionComponent } from './about-main/sections/ap-what-we-do2-section/ap-what-we-do2-section.component';
import { APTeam4SectionComponent } from './about-main/sections/apteam4-section/apteam4-section.component';
import { ClientSlider2Component } from './about-main/sections/client-slider2/client-slider2.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HttpClientModule } from '@angular/common/http';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


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
    HttpClientModule,
    AboutUsRoutingModule,
    SharedModule,
    AccordionModule,
    CarouselModule,
    NgxSkeletonLoaderModule,
  ],
  providers: [
    TitleCasePipe,
  ]
})
export class AboutUsModule { }
