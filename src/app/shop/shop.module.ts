import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { SharedModule } from '../shared/shared.module';
import { ShopMainComponent } from './shop-main/shop-main.component';


@NgModule({
  declarations: [
    ShopComponent,
    ShopMainComponent,
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule,
  ]
})
export class ShopModule { }
