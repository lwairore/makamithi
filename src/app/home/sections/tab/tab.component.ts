import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mak-pit-tab',
  templateUrl: './tab.component.html',
  styles: [],
})
export class TabComponent implements OnInit {
  @Input() tabTitle = '';
  @Input() active = false;
  @Input() flaticon = '';

  constructor() { }

  ngOnInit(): void {
  }

}
