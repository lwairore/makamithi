import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabListDirective } from './directives/tab-list.directive';



@NgModule({
  declarations: [TabListDirective],
  imports: [
    CommonModule
  ]
})
export class TabsModule { }
