import { ContentChild, Directive, Input } from '@angular/core';
import { TabListDirective } from './tab-list.directive';
import { TabPanelDirective } from './tab-panel.directive';

@Directive({
  selector: 'makPitTabItem'
})
export class TabItemDirective {
  @Input() title = '';

  @Input() disabled = false;

  @ContentChild(TabListDirective)
  tabList: TabListDirective;

  @ContentChild(TabPanelDirective)
  tabPanel: TabPanelDirective;

  constructor() { }

}
