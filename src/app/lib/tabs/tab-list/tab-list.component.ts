import { Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { TabDirective } from '../directives/tab.directive';

@Component({
  selector: 'mak-pit-tab-list',
  templateUrl: './tab-list.component.html',
  styles: [
  ]
})
export class TabListComponent implements OnInit {
  @Input() tabListClass = '';

  @Input() tabListLiClass = '';

  @ContentChildren(TabDirective)
  tabItems: QueryList<TabDirective>;

  constructor() { }

  ngOnInit(): void {
  }

}
