import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabListDirective } from './directives/tab-list.directive';
import { TabDirective } from './directives/tab.directive';
import { TabPanelDirective } from './directives/tab-panel.directive';
import { TabsComponent } from './tabs.component';
import { TabItemDirective } from './directives/tab-item.directive';
import { TabListComponent } from './tab-list/tab-list.component';



@NgModule({
  declarations: [
    TabListDirective,
    TabDirective,
    TabPanelDirective,
    TabsComponent,
    TabItemDirective,
    TabListComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TabsComponent,
    TabListDirective,
    TabDirective,
    TabPanelDirective,
    TabItemDirective,
    TabListComponent,
  ]
})
export class TabsModule { }
