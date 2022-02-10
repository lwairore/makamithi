import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChild, ContentChildren, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { memoize } from 'lodash';
import { TabPanelDirective } from './directives/tab-panel.directive';
import { TabDirective } from './directives/tab.directive';
import { TabItemComponent } from './tab-item/tab-item.component';
import { TabListComponent } from './tab-list/tab-list.component';

@Component({
  selector: 'mak-pit-tabs',
  templateUrl: './tabs.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent implements OnInit, AfterContentInit {
  @Input() className = '';

  @Input() selectedTabClassName = '';

  tabPanels: QueryList<TabPanelDirective> | undefined;

  @ContentChild(TabListComponent)
  tabList: TabListComponent | undefined;

  @ContentChild(TabItemComponent)
  tabItem: TabItemComponent | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.getTabs();
  }

  isPanelTabsSelected(index: number) {
    if (this.tabItem instanceof TabItemComponent) {
      this.tabItem.isPanelTabsSelected(index)
    }
  }

  getTabs() {
    if (this.tabList instanceof TabListComponent) {
      this.tabList.tabItem = this.tabItem;

      this.tabList.selectedTabClassName = this.selectedTabClassName;

      if (this.tabItem instanceof TabItemComponent) {
        this.tabItem.tabListTabs = this.tabList.tabs;
      }
    }
  }

}
