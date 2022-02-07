import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutMainComponent } from './about-main/about-main.component';
import { SiteBreadcrumbComponent } from './sections/site-breadcrumb/site-breadcrumb.component';
import { APAbout4SectionComponent } from './sections/apabout4-section/apabout4-section.component';


@NgModule({
  declarations: [AboutMainComponent, SiteBreadcrumbComponent, APAbout4SectionComponent],
  imports: [
    CommonModule,
    AboutUsRoutingModule
  ]
})
export class AboutUsModule { }
