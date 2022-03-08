import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery.component';
import { SharedModule } from '@sharedModule/shared.module';
import { GalleryOneMainComponent } from './gallery-one-main/gallery-one-main.component';
import { TabsModule } from '../lib/tabs/tabs.module';
import { GpGalleryTwoSectionComponent } from './gallery-one-main/sections/gp-gallery-two-section/gp-gallery-two-section.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


@NgModule({
  declarations: [
    GalleryComponent,
    GalleryOneMainComponent,
    GpGalleryTwoSectionComponent,
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    SharedModule,
    TabsModule,
    NgxSkeletonLoaderModule,
  ]
})
export class GalleryModule { }
