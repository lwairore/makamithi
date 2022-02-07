import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteBreadcrumbComponent } from './site-breadcrumb/site-breadcrumb.component';



@NgModule({
  declarations: [
    SiteBreadcrumbComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SiteBreadcrumbComponent,
  ]
})
export class SharedModule { }
