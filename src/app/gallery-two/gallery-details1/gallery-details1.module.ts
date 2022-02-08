import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryDetails1RoutingModule } from './gallery-details1-routing.module';
import { GalleryDetailsOneMainComponent } from './gallery-details-one-main/gallery-details-one-main.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    GalleryDetailsOneMainComponent,
  ],
  imports: [
    CommonModule,
    GalleryDetails1RoutingModule,
    SharedModule,
  ]
})
export class GalleryDetails1Module { }
