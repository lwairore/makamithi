import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderDefaultComponent } from './slider-default/slider-default.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HomeRoutingModule } from './home-routing.module';



@NgModule({
  declarations: [
    SliderDefaultComponent,
    HomePageComponent,
  ],
  imports: [
    CommonModule,
    // BrowserAnimationsModule,
    HomeRoutingModule,
    CarouselModule,
  ]
})
export class HomeModule { }
