import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryTwoMainComponent } from './gallery-two-main/gallery-two-main.component';
import { GalleryTwoComponent } from './gallery-two.component';


const routes: Routes = [
  {
    path: '',
    component: GalleryTwoComponent,
    children: [
      {
        path: '',
        component: GalleryTwoMainComponent,
      },
      {
        path: 'gallery-details',
        loadChildren: () => import('./gallery-details1/gallery-details1.module')
          .then(g => g.GalleryDetails1Module),
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryTwoRoutingModule { }
