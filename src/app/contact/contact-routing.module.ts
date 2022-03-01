import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsMainComponent } from './contacts-main/contacts-main.component';


const routes: Routes = [
  {
    path: ':pageNumber',
    component: ContactsMainComponent
  },
  {
    path: '',
    redirectTo: '1'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
