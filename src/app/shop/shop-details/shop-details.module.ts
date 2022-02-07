import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopDetailsRoutingModule } from './shop-details-routing.module';
import { ShopDetailsMainComponent } from './shop-details-main/shop-details-main.component';


@NgModule({
  declarations: [ShopDetailsMainComponent],
  imports: [
    CommonModule,
    ShopDetailsRoutingModule
  ]
})
export class ShopDetailsModule { }
