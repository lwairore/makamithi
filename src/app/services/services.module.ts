import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services.component';
import { SharedModule } from '../shared/shared.module';
import { SPStyleOneComponent } from './sections/spstyle-one/spstyle-one.component';
import { SPStyleTwoComponent } from './sections/spstyle-two/spstyle-two.component';
import { SPVideoSectionComponent } from './sections/spvideo-section/spvideo-section.component';
import { SPAboutSectionComponent } from './sections/spabout-section/spabout-section.component';
import { SPPricingComponent } from './sections/sppricing/sppricing.component';
import { ServiceOneMainComponent } from './service-one-main/service-one-main.component';


@NgModule({
  declarations: [
    ServicesComponent,
    SPStyleOneComponent,
    SPStyleTwoComponent,
    SPVideoSectionComponent,
    SPAboutSectionComponent,
    SPPricingComponent,
    ServiceOneMainComponent,
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    SharedModule,
  ]
})
export class ServicesModule { }
