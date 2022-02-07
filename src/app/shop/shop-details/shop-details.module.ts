import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopDetailsRoutingModule } from './shop-details-routing.module';
import { ShopDetailsMainComponent } from './shop-details-main/shop-details-main.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ShopDetailsMainComponent,
  ],
  imports: [
    CommonModule,
    ShopDetailsRoutingModule,
    SharedModule,
  ]
})
export class ShopDetailsModule { }
