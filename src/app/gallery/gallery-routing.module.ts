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
        component: GalleryOneMainComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }
