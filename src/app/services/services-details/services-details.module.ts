import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesDetailsRoutingModule } from './services-details-routing.module';
import { ServiceDetailsMainComponent } from './service-details-main/service-details-main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SPServiceDetailsSectionComponent } from './sections/spservice-details-section/spservice-details-section.component';


@NgModule({
  declarations: [
    ServiceDetailsMainComponent,
    SPServiceDetailsSectionComponent,
  ],
  imports: [
    CommonModule,
    ServicesDetailsRoutingModule,
    SharedModule,
  ]
})
export class ServicesDetailsModule { }
