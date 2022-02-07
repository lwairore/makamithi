import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { TopHeaderComponent } from './header/sections/top-header/top-header.component';
import { BurgerMenusComponent } from './header/sections/burger-menus/burger-menus.component';
import { SidebarComponent } from './header/sections/sidebar/sidebar.component';
import { SearchBarComponent } from './header/sections/search-bar/search-bar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { HeaderStyleTwoComponent } from './header-style-two/header-style-two.component';



@NgModule({
  declarations: [
    HeaderComponent,
    TopHeaderComponent,
    BurgerMenusComponent,
    SidebarComponent,
    SearchBarComponent,
    FooterComponent,
    HeaderStyleTwoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ]
})
export class CoreModule { }
