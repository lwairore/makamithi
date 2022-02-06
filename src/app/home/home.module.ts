import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderDefaultComponent } from './sections/slider-default/slider-default.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HomeRoutingModule } from './home-routing.module';
import { H1AboutSectionComponent } from './sections/h1-about-section/h1-about-section.component';



@NgModule({
  declarations: [
    SliderDefaultComponent,
    HomePageComponent,
    H1AboutSectionComponent,
  ],
  imports: [
    CommonModule,
    // BrowserAnimationsModule,
    HomeRoutingModule,
    CarouselModule,
  ]
})
export class HomeModule { }
