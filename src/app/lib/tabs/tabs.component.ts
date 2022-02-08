import { Component, ContentChild, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { memoize } from 'lodash';
import { TabPanelDirective } from './directives/tab-panel.directive';
import { TabDirective } from './directives/tab.directive';
import { TabListComponent } from './tab-list/tab-list.component';

@Component({
  selector: 'mak-pit-tabs',
  templateUrl: './tabs.component.html',
  styles: [
  ]
})
export class TabsComponent implements OnInit {
  @Input() className = '';

  @Input() selectedTabClassName = '';

  @ContentChildren(TabPanelDirective)
  panels: QueryList<TabPanelDirective>;

  @ContentChild(TabListComponent)
  tabList: TabListComponent;

  constructor() { }

  ngOnInit(): void {
  }

  isPanelSelected = memoize((panelLoopIndex: number) => {
    const panelTab = this.tabList.tabItems.toArray()[panelLoopIndex];

    if (!(panelTab instanceof TabDirective)) {
      return false;
    }

    return panelTab.active;
  })

}
