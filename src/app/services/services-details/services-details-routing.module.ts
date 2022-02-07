import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceDetailsMainComponent } from './service-details-main/service-details-main.component';


const routes: Routes = [
  {
    path: '',
    component: ServiceDetailsMainComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesDetailsRoutingModule { }
