import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mak-pit-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  searchBarOpen = false;

  menuOpen = false;

  sidebarOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  setSearchBarOpen(open: boolean) {
    this.searchBarOpen = open;
  }

  setMenuOpen(open: boolean) {
    this.menuOpen = open; ;
  }

  setSidebarOpen(open: boolean) {
    this.sidebarOpen = open;
  }

}
