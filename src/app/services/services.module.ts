import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services.component';
import { SharedModule } from '../shared/shared.module';
import { SPStyleOneComponent } from './sections/spstyle-one/spstyle-one.component';
import { SPStyleTwoComponent } from './sections/spstyle-two/spstyle-two.component';


@NgModule({
  declarations: [
    ServicesComponent,
    SPStyleOneComponent,
    SPStyleTwoComponent,
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    SharedModule,
  ]
})
export class ServicesModule { }
