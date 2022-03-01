import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsAndPrivacyPolicyRoutingModule } from './terms-and-privacy-policy-routing.module';
import { SharedModule } from '@sharedModule/shared.module';
import { TermsAndPrivacyPolicyComponent } from './terms-and-privacy-policy.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';


@NgModule({
  declarations: [
    TermsAndPrivacyPolicyComponent,
    PrivacyPolicyComponent,
  ],
  imports: [
    CommonModule,
    TermsAndPrivacyPolicyRoutingModule,
    SharedModule,
  ]
})
export class TermsAndPrivacyPolicyModule { }
