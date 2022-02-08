import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopDetailsRoutingModule } from './shop-details-routing.module';
import { ShopDetailsMainComponent } from './shop-details-main/shop-details-main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SPShopDetailsSectionComponent } from './shop-details-main/sections/spshop-details-section/spshop-details-section.component';
import { TabsModule } from 'src/app/lib/tabs/tabs.module';


@NgModule({
  declarations: [
    ShopDetailsMainComponent,
    SPShopDetailsSectionComponent,
  ],
  imports: [
    CommonModule,
    ShopDetailsRoutingModule,
    SharedModule,
    TabsModule,
  ]
})
export class ShopDetailsModule { }
