import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsAndPrivacyPolicyComponent } from './terms-and-privacy-policy.component';


const routes: Routes = [
  {
    path: '',
    component: TermsAndPrivacyPolicyComponent,
    children: [
      {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermsAndPrivacyPolicyRoutingModule { }
