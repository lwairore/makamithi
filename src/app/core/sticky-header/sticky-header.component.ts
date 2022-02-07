import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mak-pit-sticky-header',
  templateUrl: './sticky-header.component.html',
  styles: [
  ]
})
export class StickyHeaderComponent implements OnInit {
  @Input() menuOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

}
