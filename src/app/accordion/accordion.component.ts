import { Component, Input, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
