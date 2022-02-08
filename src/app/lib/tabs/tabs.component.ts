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

  tabPanels: QueryList<TabPanelDirective>;

  // tabListTabs: QueryList<TabDirective>;

  @ContentChild(TabListComponent)
  tabList: TabListComponent;

  @ContentChild(TabItemComponent)
  tabItem: TabItemComponent;

  // @ContentChild(TabListDirective)
  // newTabList: TabListDirective;

  expanded = new Set<number>();



  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.getTabs();
  }

  isPanelTabsSelected(index: number) {
    this.tabItem.isPanelTabsSelected(index)
  }

  getTabs() {
    this.tabList.tabItem = this.tabItem;

    this.tabList.selectedTabClassName = this.selectedTabClassName;

    this.tabItem.tabListTabs = this.tabList.tabs;
  }

  showTabsPanels = () => {
    // console.log("this.tabItem")
    // console.log(this.tabItem)

    // console.log('Tab panels')
    // console.log(this.tabItem.tabPanel.toArray())

    // console.log("this.panels")
    // console.log(this.panels)

    // console.log("this.newTabList")
    // console.log(this.newTabList);
    // console.log('tabs ')
    // console.log(this.newTabList.tabs.toArray());
  }



}
