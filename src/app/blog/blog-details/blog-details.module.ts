import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogDetailsRoutingModule } from './blog-details-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BlogDetailsMainComponent } from './blog-details-main/blog-details-main.component';
import { BlogPostRelatedComponent } from './blog-details-main/sections/blog-post-related/blog-post-related.component';
import { BlogPostArrowComponent } from './blog-details-main/sections/blog-post-arrow/blog-post-arrow.component';
import { BlogPostAuthorComponent } from './blog-details-main/sections/blog-post-author/blog-post-author.component';
import { BlogPostCommentsComponent } from './blog-details-main/sections/blog-post-comments/blog-post-comments.component';
import { BlogCommentsFormComponent } from './blog-details-main/sections/blog-comments-form/blog-comments-form.component';
import { BlogWidgetSearchComponent } from './blog-details-main/sections/widgets/blog-widget-search/blog-widget-search.component';
import { BlogWidgetAboutComponent } from './blog-details-main/sections/widgets/blog-widget-about/blog-widget-about.component';
import { BlogWidgetFeedsComponent } from './blog-details-main/sections/widgets/blog-widget-feeds/blog-widget-feeds.component';


@NgModule({
  declarations: [
    BlogDetailsMainComponent,
    BlogPostRelatedComponent,
    BlogPostArrowComponent,
    BlogPostAuthorComponent,
    BlogPostCommentsComponent,
    BlogCommentsFormComponent,
    BlogWidgetSearchComponent,
    BlogWidgetAboutComponent,
    BlogWidgetFeedsComponent,
  ],
  imports: [
    CommonModule,
    BlogDetailsRoutingModule,
    SharedModule,
  ]
})
export class BlogDetailsModule { }
