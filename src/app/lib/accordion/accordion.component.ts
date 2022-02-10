import { ChangeDetectionStrategy, Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { AccordionItemDirective } from './directives/accordion-item.directive';
import { memoize } from 'lodash-es';
import { trigger, state, style, transition, animate } from "@angular/animations";

@Component({
  selector: 'mak-pit-accordion',
  templateUrl: './accordion.component.html',
  styles: [
  ],
  animations: [
    trigger('contentExpansion', [
      state('expanded', style({ height: '*', opacity: 1, visibility: 'visible' })),
      state('collapsed', style({ height: '0px', opacity: 0, visibility: 'hidden' })),
      transition('expanded <=> collapsed',
        animate('200ms cubic-bezier(.37,1.04,.68,.98)')),
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  items: QueryList<AccordionItemDirective> | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Make the toggle function available to be called from
   * outside.
   * @param index - Index of the accordion item
   */
  getToggleState = memoize((index: number) => {
    console.log('Callled getToggleState');

    console.log("getToggleState", index)
    console.log("expanded")
    console.log(this.expanded)
    console.log("items")
    console.log(this.items)
    return this.toggleState.bind(this, index);
  });

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
