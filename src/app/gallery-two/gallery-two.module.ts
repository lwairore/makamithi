import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryTwoRoutingModule } from './gallery-two-routing.module';
import { SharedModule } from '../shared/shared.module';
import { GalleryTwoComponent } from './gallery-two.component';
import { GalleryTwoMainComponent } from './gallery-two-main/gallery-two-main.component';
import { GpGalleryTwoSectionComponent } from './gallery-two-main/sections/gp-gallery-two-section/gp-gallery-two-section.component';


@NgModule({
  declarations: [GalleryTwoComponent, GalleryTwoMainComponent, GpGalleryTwoSectionComponent],
  imports: [
    CommonModule,
    GalleryTwoRoutingModule,
    SharedModule,
  ]
})
export class GalleryTwoModule { }
