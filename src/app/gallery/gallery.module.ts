import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery.component';
import { SharedModule } from '../shared/shared.module';
import { GalleryOneMainComponent } from './gallery-one-main/gallery-one-main.component';
import { GalleryTabOneComponent } from './gallery-one-main/sections/gallery-tab-one/gallery-tab-one.component';
import { TabsModule } from '../lib/tabs/tabs.module';


@NgModule({
  declarations: [
    GalleryComponent,
    GalleryOneMainComponent,
    GalleryTabOneComponent,
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    SharedModule,
    TabsModule,
  ]
})
export class GalleryModule { }
