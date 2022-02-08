import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogDetailsRoutingModule } from './blog-details-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BlogDetailsMainComponent } from './blog-details-main/blog-details-main.component';
import { BlogPostRelatedComponent } from './blog-details-main/sections/blog-post-related/blog-post-related.component';


@NgModule({
  declarations: [
    BlogDetailsMainComponent,
    BlogPostRelatedComponent,
  ],
  imports: [
    CommonModule,
    BlogDetailsRoutingModule,
    SharedModule,
  ]
})
export class BlogDetailsModule { }
