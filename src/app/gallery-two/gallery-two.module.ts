import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryTwoRoutingModule } from './gallery-two-routing.module';
import { SharedModule } from '../shared/shared.module';
import { GalleryTwoComponent } from './gallery-two.component';


@NgModule({
  declarations: [GalleryTwoComponent],
  imports: [
    CommonModule,
    GalleryTwoRoutingModule,
    SharedModule,
  ]
})
export class GalleryTwoModule { }
