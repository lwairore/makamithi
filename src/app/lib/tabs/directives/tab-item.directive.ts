import { ContentChild, ContentChildren, Directive, Input, QueryList } from '@angular/core';
import { TabListComponent } from '../tab-list/tab-list.component';
import { TabPanelDirective } from './tab-panel.directive';

@Directive({
  selector: 'makPitTabItem'
})
export class TabItemDirective {
  @Input() title = '';

  @Input() disabled = false;

  @ContentChild(TabListComponent)
  tabList: TabListComponent;

  @ContentChildren(TabPanelDirective)
  tabPanel: QueryList<TabPanelDirective>;

  constructor() { }

}
