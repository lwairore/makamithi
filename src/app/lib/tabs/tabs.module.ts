import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabDirective } from './directives/tab.directive';
import { TabPanelDirective } from './directives/tab-panel.directive';
import { TabsComponent } from './tabs.component';
import { TabListComponent } from './tab-list/tab-list.component';
import { TabItemComponent } from './tab-item/tab-item.component';



@NgModule({
  declarations: [
    TabDirective,
    TabPanelDirective,
    TabsComponent,
    TabListComponent,
    TabItemComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TabsComponent,
    TabDirective,
    TabPanelDirective,
    TabListComponent,
    TabItemComponent,
  ]
})
export class TabsModule { }
