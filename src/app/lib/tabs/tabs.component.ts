import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChild, ContentChildren, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { memoize } from 'lodash';
import { TabItemDirective } from './directives/tab-item.directive';
import { TabListDirective } from './directives/tab-list.directive';
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

  tabPanels: QueryList<TabPanelDirective>;

  tabListTabs: QueryList<TabDirective>;

  // @ContentChild(TabListComponent)
  // tabList: TabListComponent;

  @ContentChild(TabItemComponent)
  tabItem: TabItemComponent;

  @ContentChild(TabListDirective)
  newTabList: TabListDirective;

  expanded = new Set<number>();



  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.getTabs();

    this.ifNoActivateTabSetActivateFirst();
  }

  ifNoActivateTabSetActivateFirst() {
    // get all active tabs
    let activeTabs = this.tabListTabs.filter((tab) => tab.active);

    console.log({ activeTabs })

    // if there is no active tab set, activate the first
    if (activeTabs.length === 0) {
      this.selectTab(this.tabListTabs.first, 0);
    }
  }

  selectTab(tab: TabDirective, index: number) {
    console.log({ tab })
    // deactivate all tabs
    this.tabListTabs.toArray().forEach(tab => tab.active = false);

    // activate the tab the user has clicked on.
    tab.active = true;

    this.tabItem.isPanelTabsSelected(index);
  }

  getTabs() {
    this.tabListTabs = this.newTabList.tabs;

    this.tabItem.tabListTabs = this.tabListTabs;
  }

  showTabsPanels = () => {
    // console.log("this.tabItem")
    // console.log(this.tabItem)

    // console.log('Tab panels')
    // console.log(this.tabItem.tabPanel.toArray())

    // console.log("this.panels")
    // console.log(this.panels)

    console.log("this.newTabList")
    console.log(this.newTabList);
    console.log('tabs ')
    console.log(this.newTabList.tabs.toArray());
  }



}
