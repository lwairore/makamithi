import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactsMainComponent } from './contacts-main/contacts-main.component';
import { SharedModule } from '@sharedModule/shared.module';
import { CPContactInfoSectionComponent } from './contacts-main/sections/cpcontact-info-section/cpcontact-info-section.component';
import { CPContactFormSectionComponent } from './contacts-main/sections/cpcontact-form-section/cpcontact-form-section.component';


@NgModule({
  declarations: [
    ContactsMainComponent,
    CPContactInfoSectionComponent,
    CPContactFormSectionComponent,
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    SharedModule,
  ]
})
export class ContactModule { }
