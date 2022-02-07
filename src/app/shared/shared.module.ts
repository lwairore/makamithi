import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteBreadcrumbComponent } from './site-breadcrumb/site-breadcrumb.component';
import { HeaderComponent } from './header/header.component';
import { TopHeaderComponent } from './header/sections/top-header/top-header.component';
import { BurgerMenusComponent } from './common/burger-menus/burger-menus.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { HeaderStyleTwoComponent } from './header-style-two/header-style-two.component';
import { SearchBarComponent } from './common/search-bar/search-bar.component';
import { StickyHeaderComponent } from './common/sticky-header/sticky-header.component';
import { TopHeader2Component } from './header-style-two/sections/top-header2/top-header2.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SiteBreadcrumbComponent,
    HeaderComponent,
    TopHeaderComponent,
    BurgerMenusComponent,
    SidebarComponent,
    SearchBarComponent,
    HeaderStyleTwoComponent,
    TopHeader2Component,
    StickyHeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    SiteBreadcrumbComponent,
    HeaderComponent,
    HeaderStyleTwoComponent,
  ]
})
export class SharedModule { }
