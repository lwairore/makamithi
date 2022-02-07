import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'mak-pit-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  @Input() sidebarOpen = false;

  @Output() setSidebarOpen = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  dispatchSetSidebarOpenEvt() {
    this.setSidebarOpen.emit(!this.sidebarOpen);
  }

}
