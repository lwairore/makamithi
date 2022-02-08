import { ContentChildren, Directive, QueryList } from '@angular/core';
import { TabDirective } from './tab.directive';

@Directive({
  selector: '[makPitTabList]'
})
export class TabListDirective {
  @ContentChildren(TabDirective)
  tabItems: QueryList<TabDirective>;

  constructor() { }

}
