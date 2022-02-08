import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogDetailsMainComponent } from './blog-details-main/blog-details-main.component';


const routes: Routes = [
  {
    path: '',
    component: BlogDetailsMainComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogDetailsRoutingModule { }
