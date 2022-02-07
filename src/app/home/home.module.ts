import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderDefaultComponent } from './sections/slider-default/slider-default.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HomeRoutingModule } from './home-routing.module';
import { H1AboutSectionComponent } from './sections/h1-about-section/h1-about-section.component';
import { H1FeaturesSectionComponent } from './sections/h1-features-section/h1-features-section.component';
import { ProductComponent } from './sections/product/product.component';
import { H1CtaSectionComponent } from './sections/h1-cta-section/h1-cta-section.component';
import { H1ChooseUsSectionComponent } from './sections/h1-choose-us-section/h1-choose-us-section.component';
import { H1GallerySectionComponent } from './sections/h1-gallery-section/h1-gallery-section.component';
import { H1TeamSectionComponent } from './sections/h1-team-section/h1-team-section.component';
import { CounterDefaultComponent } from './sections/counter-default/counter-default.component';
import { ClientSliderComponent } from './sections/client-slider/client-slider.component';
import { H1BlogSectionComponent } from './sections/h1-blog-section/h1-blog-section.component';
import { BrandComponent } from './sections/brand/brand.component';
import { TabListComponent } from './sections/tab-list/tab-list.component';
import { TabComponent } from './sections/tab/tab.component';
import { TabPanelComponent } from './sections/tab-panel/tab-panel.component';



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
    TabListComponent,
    TabComponent,
    TabPanelComponent,
  ],
  imports: [
    CommonModule,
    // BrowserAnimationsModule,
    HomeRoutingModule,
    CarouselModule,
  ]
})
export class HomeModule { }
