import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutMainComponent } from './about-main/about-main.component';


const routes: Routes = [
  {
    path: '',
    component: AboutMainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutUsRoutingModule { }
