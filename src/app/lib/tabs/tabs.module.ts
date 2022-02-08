import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabListDirective } from './directives/tab-list.directive';
import { TabDirective } from './directives/tab.directive';
import { TabPanelDirective } from './directives/tab-panel.directive';



@NgModule({
  declarations: [TabListDirective, TabDirective, TabPanelDirective],
  imports: [
    CommonModule
  ]
})
export class TabsModule { }
