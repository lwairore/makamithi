import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesDetailsRoutingModule } from './services-details-routing.module';
import { ServiceDetailsMainComponent } from './service-details-main/service-details-main.component';


@NgModule({
  declarations: [ServiceDetailsMainComponent],
  imports: [
    CommonModule,
    ServicesDetailsRoutingModule
  ]
})
export class ServicesDetailsModule { }
