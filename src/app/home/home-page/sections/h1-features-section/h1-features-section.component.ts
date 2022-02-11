import { Component, OnInit } from '@angular/core';
import * as Immutable from 'immutable';

@Component({
  selector: 'mak-pit-h1-features-section',
  templateUrl: './h1-features-section.component.html',
  styles: [
  ]
})
export class H1FeaturesSectionComponent implements OnInit {
  listOurFeature = Immutable.fromJS([]);

  constructor() { }

  ngOnInit(): void {
  }

}
