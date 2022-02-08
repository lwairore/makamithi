import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryTwoRoutingModule } from './gallery-two-routing.module';
import { SharedModule } from '../shared/shared.module';
import { GalleryTwoComponent } from './gallery-two.component';
import { GalleryTwoMainComponent } from './gallery-two-main/gallery-two-main.component';


@NgModule({
  declarations: [GalleryTwoComponent, GalleryTwoMainComponent],
  imports: [
    CommonModule,
    GalleryTwoRoutingModule,
    SharedModule,
  ]
})
export class GalleryTwoModule { }
