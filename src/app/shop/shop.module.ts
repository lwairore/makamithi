import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { SharedModule } from '@sharedModule/shared.module';
import { ShopMainComponent } from './shop-main/shop-main.component';
import { SPProductSectionComponent } from './shop-main/sections/spproduct-section/spproduct-section.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


@NgModule({
  declarations: [
    ShopComponent,
    ShopMainComponent,
    SPProductSectionComponent,
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule,
    NgxSkeletonLoaderModule,
  ]
})
export class ShopModule { }
