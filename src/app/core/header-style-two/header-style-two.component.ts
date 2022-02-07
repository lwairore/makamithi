import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mak-pit-header-style-two',
  templateUrl: './header-style-two.component.html',
  styles: [
  ]
})
export class HeaderStyleTwoComponent implements OnInit {
  searchBarOpen = false;

  menuOpen = false;

  sidebarOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  setSearchBarOpen(open: boolean) {
    this.searchBarOpen = open;
  }

}
