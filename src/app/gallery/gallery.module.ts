import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery.component';
import { SharedModule } from '../shared/shared.module';
import { GalleryOneMainComponent } from './gallery-one-main/gallery-one-main.component';


@NgModule({
  declarations: [
    GalleryComponent,
    GalleryOneMainComponent,
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    SharedModule
  ]
})
export class GalleryModule { }
