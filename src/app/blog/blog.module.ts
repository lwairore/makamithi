import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { SharedModule } from '../shared/shared.module';
import { BlogMainComponent } from './blog-main/blog-main.component';
import { ArticleLayoutComponent } from './blog-main/sections/article-layout/article-layout.component';


@NgModule({
  declarations: [
    BlogComponent,
    BlogMainComponent,
    ArticleLayoutComponent,
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule,
  ]
})
export class BlogModule { }
