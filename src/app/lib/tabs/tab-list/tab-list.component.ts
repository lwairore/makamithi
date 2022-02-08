import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { TabDirective } from '../directives/tab.directive';
import { TabItemComponent } from '../tab-item/tab-item.component';

@Component({
  selector: 'mak-pit-tab-list',
  templateUrl: './tab-list.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabListComponent implements AfterViewInit {
  @Input() className = '';

  @Input() selectedTabClassName = '';

  @ContentChildren(TabDirective)
  tabs: QueryList<TabDirective>;

  tabItem: TabItemComponent;

  constructor(
    private ref: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    this.ifNoActivateTabSetActivateFirst();
  }

  ifNoActivateTabSetActivateFirst() {
    // get all active tabs
    let activeTabs = this.tabs.filter((tab) => tab.active);

    console.log({ activeTabs })

    // if there is no active tab set, activate the first
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first, 0);
    }
  }

  private _manuallyTriggerChangeDetection() {
    this.ref.detectChanges();
  }

  selectTab(tab: TabDirective, index: number) {
    console.log({ tab })
    // deactivate all tabs
    this.tabs.toArray().forEach(tab => tab.active = false);

    // activate the tab the user has clicked on.
    tab.active = true;

    console.log({ tab });

    this._manuallyTriggerChangeDetection();

    this.tabItem.isPanelTabsSelected(index);

    this.tabItem.manuallyTriggerChangeDetection();
  }
}
