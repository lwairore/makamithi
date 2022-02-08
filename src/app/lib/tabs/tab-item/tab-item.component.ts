import { Component, ContentChildren, OnInit, QueryList } from '@angular/core';
import { TabPanelDirective } from '../directives/tab-panel.directive';
import { TabDirective } from '../directives/tab.directive';
import { TabsComponent } from '../tabs.component';

@Component({
  selector: 'mak-pit-tab-item',
  templateUrl: './tab-item.component.html',
  styles: [
  ]
})
export class TabItemComponent implements OnInit {
  @ContentChildren(TabPanelDirective)
  tabPanels: QueryList<TabPanelDirective>;

  tabListTabs: QueryList<TabDirective>;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  isPanelTabsSelected = (panelLoopIndex: number) => {
    const panelTab = this.tabListTabs?.toArray()[panelLoopIndex];

    console.log(panelTab)

    return panelTab?.active;

  }

}
