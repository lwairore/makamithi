import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryDetailsOneMainComponent } from './gallery-details-one-main/gallery-details-one-main.component';


const routes: Routes = [
  {
    path: '',
    component: GalleryDetailsOneMainComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryDetails1RoutingModule { }
