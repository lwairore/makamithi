import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabDirective } from './directives/tab.directive';
import { TabPanelDirective } from './directives/tab-panel.directive';
import { TabsComponent } from './tabs.component';
import { TabItemDirective } from './directives/tab-item.directive';
import { TabListComponent } from './tab-list/tab-list.component';
import { TabListDirective } from './directives/tab-list.directive';
import { TabItemComponent } from './tab-item/tab-item.component';



@NgModule({
  declarations: [
    TabDirective,
    TabPanelDirective,
    TabsComponent,
    TabItemDirective,
    TabListComponent,
    TabListDirective,
    TabItemComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TabsComponent,
    TabDirective,
    TabPanelDirective,
    TabItemDirective,
    TabListComponent,
    TabListDirective,
    TabItemComponent,
  ]
})
export class TabsModule { }
