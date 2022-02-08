import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabListDirective } from './directives/tab-list.directive';
import { TabDirective } from './directives/tab.directive';
import { TabPanelDirective } from './directives/tab-panel.directive';
import { TabsComponent } from './tabs.component';



@NgModule({
  declarations: [
    TabListDirective,
    TabDirective,
    TabPanelDirective,
    TabsComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TabsComponent,
    TabListDirective,
  ]
})
export class TabsModule { }
