import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogDetailsRoutingModule } from './blog-details-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BlogDetailsMainComponent } from './blog-details-main/blog-details-main.component';


@NgModule({
  declarations: [
    BlogDetailsMainComponent,
  ],
  imports: [
    CommonModule,
    BlogDetailsRoutingModule,
    SharedModule,
  ]
})
export class BlogDetailsModule { }
