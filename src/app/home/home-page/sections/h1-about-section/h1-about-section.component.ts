import { Component, OnInit } from '@angular/core';
import * as Immutable from 'immutable';

@Component({
  selector: 'mak-pit-h1-about-section',
  templateUrl: './h1-about-section.component.html',
  styles: [
  ]
})
export class H1AboutSectionComponent implements OnInit {
  aboutSectionDetails = Immutable.fromJS({});

  constructor() { }

  ngOnInit(): void {
  }

}
