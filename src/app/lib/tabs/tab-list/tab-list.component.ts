import { AfterViewInit, Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { TabDirective } from '../directives/tab.directive';

@Component({
  selector: 'mak-pit-tab-list',
  templateUrl: './tab-list.component.html',
  styles: [
  ]
})
export class TabListComponent implements AfterViewInit {
  @Input() tabListUlClass = '';

  @Input() tabListLiClass = '';

  @ContentChildren(TabDirective)
  tabItems: QueryList<TabDirective>;

  constructor() { }

  ngAfterViewInit(): void {
    // get all active tabs
    let activeTabs = this.tabItems.filter((tab) => tab.active);

    console.log({ activeTabs })

    // if there is no active tab set, activate the first
    if (activeTabs.length === 0) {
      this.selectTab(this.tabItems.first);
    }
  }

}
