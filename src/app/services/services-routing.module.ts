import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceOneMainComponent } from './service-one-main/service-one-main.component';
import { ServicesComponent } from './services.component';


const routes: Routes = [
  {
    path: '',
    component: ServicesComponent,
    children: [
      {
        path: '',
        component: ServiceOneMainComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
