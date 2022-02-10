import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SliderDefaultComponent } from './home-page/sections/slider-default/slider-default.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HomeRoutingModule } from './home-routing.module';
import { H1AboutSectionComponent } from './home-page/sections/h1-about-section/h1-about-section.component';
import { H1FeaturesSectionComponent } from './home-page/sections/h1-features-section/h1-features-section.component';
import { ProductComponent } from './home-page/sections/product/product.component';
import { H1CtaSectionComponent } from './home-page/sections/h1-cta-section/h1-cta-section.component';
import { H1ChooseUsSectionComponent } from './home-page/sections/h1-choose-us-section/h1-choose-us-section.component';
import { H1GallerySectionComponent } from './home-page/sections/h1-gallery-section/h1-gallery-section.component';
import { H1TeamSectionComponent } from './home-page/sections/h1-team-section/h1-team-section.component';
import { CounterDefaultComponent } from './home-page/sections/counter-default/counter-default.component';
import { ClientSliderComponent } from './home-page/sections/client-slider/client-slider.component';
import { H1BlogSectionComponent } from './home-page/sections/h1-blog-section/h1-blog-section.component';
import { BrandComponent } from './home-page/sections/brand/brand.component';
import { SharedModule } from '@sharedModule/shared.module';
import { TabsModule } from '../lib/tabs/tabs.module';



@NgModule({
  declarations: [
    SliderDefaultComponent,
    HomePageComponent,
    H1AboutSectionComponent,
    H1FeaturesSectionComponent,
    ProductComponent,
    H1CtaSectionComponent,
    H1ChooseUsSectionComponent,
    H1GallerySectionComponent,
    H1TeamSectionComponent,
    CounterDefaultComponent,
    ClientSliderComponent,
    H1BlogSectionComponent,
    BrandComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    // BrowserAnimationsModule,
    HomeRoutingModule,
    CarouselModule,
    SharedModule,
    TabsModule,
  ]
})
export class HomeModule { }
