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
      {
        path: 'shop-details',
        loadChildren: () => import('./shop-details/shop-details.module')
          .then(s => s.ShopDetailsModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
