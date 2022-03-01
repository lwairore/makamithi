import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services.component';
import { SharedModule } from '@sharedModule/shared.module';
import { SPStyleOneComponent } from './service-one-main/sections/spstyle-one/spstyle-one.component';
import { SPStyleTwoComponent } from './service-one-main/sections/spstyle-two/spstyle-two.component';
import { SPVideoSectionComponent } from './service-one-main/sections/spvideo-section/spvideo-section.component';
import { SPAboutSectionComponent } from './service-one-main/sections/spabout-section/spabout-section.component';
import { SPPricingComponent } from './service-one-main/sections/sppricing/sppricing.component';
import { ServiceOneMainComponent } from './service-one-main/service-one-main.component';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';

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
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
  ]
})
export class ServicesModule { }
