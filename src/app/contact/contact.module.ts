import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactsMainComponent } from './contacts-main/contacts-main.component';
import { SharedModule } from '../shared/shared.module';
import { CPContactInfoSectionComponent } from './contacts-main/sections/cpcontact-info-section/cpcontact-info-section.component';


@NgModule({
  declarations: [
    ContactsMainComponent,
    CPContactInfoSectionComponent,
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    SharedModule,
  ]
})
export class ContactModule { }
