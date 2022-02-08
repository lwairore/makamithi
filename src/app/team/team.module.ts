import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamRoutingModule } from './team-routing.module';
import { TeamMainComponent } from './team-main/team-main.component';
import { SharedModule } from '../shared/shared.module';
import { TeamSectionComponent } from './team-main/sections/team-section/team-section.component';
import { GPCtaSectionComponent } from './team-main/sections/gpcta-section/gpcta-section.component';


@NgModule({
  declarations: [
    TeamMainComponent,
    TeamSectionComponent,
    GPCtaSectionComponent,
  ],
  imports: [
    CommonModule,
    TeamRoutingModule,
    SharedModule,
  ]
})
export class TeamModule { }
