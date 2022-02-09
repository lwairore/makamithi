import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactsMainComponent } from './contacts-main/contacts-main.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ContactsMainComponent,
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    SharedModule,
  ]
})
export class ContactModule { }
