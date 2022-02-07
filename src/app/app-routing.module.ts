import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(h => h.HomeModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./about-us/about-us.module')
      .then(a => a.AboutUsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
