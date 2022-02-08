import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mak-pit-tabs',
  templateUrl: './tabs.component.html',
  styles: [
  ]
})
export class TabsComponent implements OnInit {
  @Input() className = '';

  @Input() selectedTabClassName = '';

  constructor() { }

  ngOnInit(): void {
  }

}
