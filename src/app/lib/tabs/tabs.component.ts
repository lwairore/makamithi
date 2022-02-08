import { Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { TabPanelDirective } from './directives/tab-panel.directive';

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

  constructor() { }

  ngOnInit(): void {
  }

}
