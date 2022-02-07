import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopMainComponent } from './shop-main/shop-main.component';
import { ShopComponent } from './shop.component';


const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
    children: [
      {
        path: '',
        component: ShopMainComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
