import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList } from '@angular/core';
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
  tabs: QueryList<TabDirective> | undefined;

  tabItem: TabItemComponent | undefined;

  @Output() tabSelectedEvent = new EventEmitter<number>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    this.ifNoActivateTabSetActivateFirst();
  }

  ifNoActivateTabSetActivateFirst() {
    if (this.tabs instanceof QueryList) {
      // get all active tabs
      let activeTabs = this.tabs.filter((tab) => tab.active);

      console.log({ activeTabs })

      // if there is no active tab set, activate the first
      if (activeTabs.length === 0) {
        this.selectTab(this.tabs.first, 0);
      }
    }
  }

  private _manuallyTriggerChangeDetection() {
    this._changeDetectorRef.detectChanges();
  }

  private _emitTabSelectedEvent(tabID?: number) {
    this.tabSelectedEvent.emit(tabID);
  }

  selectTab(tab: TabDirective, index: number) {
    if (this.tabs instanceof QueryList) {
      console.log({ tab })
      // deactivate all tabs
      this.tabs.toArray().forEach(tab => tab.active = false);

      // activate the tab the user has clicked on.
      tab.active = true;

      console.log({ tab });

      this._manuallyTriggerChangeDetection();

      if (this.tabItem instanceof TabItemComponent) {
        this.tabItem.isPanelTabsSelected(index);

        this.tabItem.manuallyTriggerChangeDetection();
      }
    }
  }
}
