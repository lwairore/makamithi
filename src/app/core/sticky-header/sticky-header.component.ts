import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'mak-pit-sticky-header',
  templateUrl: './sticky-header.component.html',
  styles: [
  ]
})
export class StickyHeaderComponent implements OnInit {
  @Input() menuOpen = false;

  @Output() setMenuOpen = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

}
