import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabListDirective } from './directives/tab-list.directive';
import { TabDirective } from './directives/tab.directive';



@NgModule({
  declarations: [TabListDirective, TabDirective],
  imports: [
    CommonModule
  ]
})
export class TabsModule { }
