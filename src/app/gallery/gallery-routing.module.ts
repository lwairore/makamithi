import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryOneMainComponent } from './gallery-one-main/gallery-one-main.component';
import { GalleryComponent } from './gallery.component';


const routes: Routes = [
  {
    path: '',
    component: GalleryComponent,
    children: [
      {
        path: '',
        redirectTo: '1',
      },
      {
        path: ':pageNumber',
        component: GalleryOneMainComponent
      },
      {
        path: ':galleryID/gallery-details',
        loadChildren: () => import('./gallery-details1/gallery-details1.module')
          .then(g => g.GalleryDetails1Module),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }
