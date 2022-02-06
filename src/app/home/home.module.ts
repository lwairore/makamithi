import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderDefaultComponent } from './slider-default/slider-default.component';
import { HomePageComponent } from './home-page/home-page.component';



@NgModule({
  declarations: [SliderDefaultComponent, HomePageComponent],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
