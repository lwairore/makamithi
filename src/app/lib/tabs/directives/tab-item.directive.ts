import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'makPitTabItem'
})
export class TabItemDirective {
  @Input() title = '';

  constructor() { }

}
