import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryRoutingModule } from './gallery-routing.module';
import { SharedModule } from '../shared/shared.module';
import { GalleryComponent } from './gallery.component';
import { GalleryOneMainComponent } from './gallery-one-main/gallery-one-main.component';
import { TabsModule } from '../lib/tabs/tabs.module';


@NgModule({
  declarations: [
    GalleryComponent,
    GalleryOneMainComponent,
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    SharedModule,
    TabsModule,
  ]
})
export class GalleryModule { }
