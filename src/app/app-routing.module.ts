import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


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
  {
    path: 'services',
    loadChildren: () => import('./services/services.module')
      .then(s => s.ServicesModule),
  },
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.module')
      .then(s => s.ShopModule),
  },
  {
    path: 'blog',
    loadChildren: () => import('./blog/blog.module')
      .then(b => b.BlogModule),
  },
  {
    path: 'team',
    loadChildren: () => import('./team/team.module')
      .then(t => t.TeamModule),
  },
  {
    path: 'gallery',
    loadChildren: () => import('./gallery-two/gallery-two.module')
    .then(g => g.GalleryTwoModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
