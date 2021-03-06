import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesDetailsRoutingModule } from './services-details-routing.module';
import { ServiceDetailsMainComponent } from './service-details-main/service-details-main.component';
import { SharedModule } from '@sharedModule/shared.module';
import { SPServiceDetailsSectionComponent } from './service-details-main/sections/spservice-details-section/spservice-details-section.component';
import { SPServicePricingSectionComponent } from './service-details-main/sections/spservice-pricing-section/spservice-pricing-section.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


@NgModule({
  declarations: [
    ServiceDetailsMainComponent,
    SPServiceDetailsSectionComponent,
    SPServicePricingSectionComponent,
  ],
  imports: [
    CommonModule,
    ServicesDetailsRoutingModule,
    SharedModule,
    NgxSkeletonLoaderModule,
  ]
})
export class ServicesDetailsModule { }
