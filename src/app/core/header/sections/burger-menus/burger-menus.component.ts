import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'mak-pit-burger-menus',
  templateUrl: './burger-menus.component.html',
  styles: [
  ]
})
export class BurgerMenusComponent implements OnInit {
  @Input() menuOpen = false;

  @Output() setMenuOpen = new EventEmitter<boolean>();

  home = false;

  pages = false;

  constructor() { }

  ngOnInit(): void {
  }

  dispatchSetMenuOpenEvt() {
    this.setMenuOpen.emit(false);
  }

  toggleMenu(menu: string) {
    switch (menu) {
      case 'home':
        this.home = this.home ? false : true;
        this.pages = false;
        break;
      case 'pages':
        this.home = false;
        this.pages = this.pages ? false : true;
        break;

      default:
        break;
    }

  };

}
