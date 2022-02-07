import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'mak-pit-search-bar',
  templateUrl: './search-bar.component.html',
  styles: [
  ]
})
export class SearchBarComponent implements OnInit {
  @Input() searchBarOpen = false;

  @Output() setSearchBarOpen = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  dispatchSetSearchBarOpen() {
    this.setSearchBarOpen.emit(!this.searchBarOpen);
  }

}
