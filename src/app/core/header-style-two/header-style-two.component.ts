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

  constructor() { }

  ngOnInit(): void {
  }

}
