import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryTwoComponent } from './gallery-two.component';


const routes: Routes = [
  {
    path: '',
    component: GalleryTwoComponent,
    children: [],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryTwoRoutingModule { }
