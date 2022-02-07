import { Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { AccordionItemDirective } from './directives/accordion-item.directive';

@Component({
  selector: 'mak-pit-accordion',
  templateUrl: './accordion.component.html',
  styles: [
  ]
})
export class AccordionComponent implements OnInit {
  // A Set is used to maintain the state of currently expanded
  // accordion items. A set guarantees distinct values.
  expanded = new Set<number>();

  /**
   * Decides if the single item will be open at once or not.
   * In collapsing mode, toggling one would collapse others
   */

  @Input() collapsing = true;

  @ContentChildren(AccordionItemDirective)
  items: QueryList<AccordionItemDirective>;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Make the toggle function available to be called from
   * outside.
   * @param index - Index of the accordion item
   */
  getToggleState = (index: number) => {
    return this.toggleState.bind(this, index);
  };

  toggleState = (index: number) => {
    if (this.expanded.has(index)) {
      this.expanded.delete(index);
    } else {
      if (this.collapsing) {
        this.expanded.clear();
      }
      this.expanded.add(index);
    }
  };

}
