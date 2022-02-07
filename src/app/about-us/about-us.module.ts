import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutMainComponent } from './about-main/about-main.component';
import { APAbout4SectionComponent } from './sections/apabout4-section/apabout4-section.component';


@NgModule({
  declarations: [
    AboutMainComponent,
    APAbout4SectionComponent,
  ],
  imports: [
    CommonModule,
    AboutUsRoutingModule
  ]
})
export class AboutUsModule { }
