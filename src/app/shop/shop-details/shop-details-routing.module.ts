import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopDetailsMainComponent } from './shop-details-main/shop-details-main.component';


const routes: Routes = [
  {
    path: '',
    component: ShopDetailsMainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopDetailsRoutingModule { }
