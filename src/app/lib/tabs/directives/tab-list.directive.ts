import { ContentChildren, Directive, Input, QueryList, TemplateRef } from '@angular/core';
import { TabDirective } from './tab.directive';

@Directive({
  selector: 'makPitTabList'
})
export class TabListDirective {
  @Input() className = '';

  @ContentChildren(TabDirective)
  tabs: QueryList<TabDirective>;

  constructor() { }

}
