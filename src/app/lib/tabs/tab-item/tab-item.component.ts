import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, OnInit, QueryList } from '@angular/core';
import { TabPanelDirective } from '../directives/tab-panel.directive';
import { TabDirective } from '../directives/tab.directive';
import { TabsComponent } from '../tabs.component';

@Component({
  selector: 'mak-pit-tab-item',
  templateUrl: './tab-item.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabItemComponent implements OnInit {
  @ContentChildren(TabPanelDirective)
  tabPanels: QueryList<TabPanelDirective>|undefined;

  tabListTabs: QueryList<TabDirective>|undefined;

  constructor(
    private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  isPanelTabsSelected = (panelLoopIndex: number) => {
    const panelTab = this.tabListTabs?.toArray()[panelLoopIndex];

    return panelTab?.active;
  }

  manuallyTriggerChangeDetection() {
    this.ref.detectChanges();
  }

}
