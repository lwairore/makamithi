import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogDetailsRoutingModule } from './blog-details-routing.module';
import { BlogDetailsComponent } from './blog-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BlogDetailsMainComponent } from './blog-details-main/blog-details-main.component';


@NgModule({
  declarations: [
    BlogDetailsComponent,
    BlogDetailsMainComponent,
  ],
  imports: [
    CommonModule,
    BlogDetailsRoutingModule,
    SharedModule,
  ]
})
export class BlogDetailsModule { }
