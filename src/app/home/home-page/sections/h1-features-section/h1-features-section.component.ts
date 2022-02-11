import { Component, OnInit } from '@angular/core';
import * as Immutable from 'immutable';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mak-pit-h1-features-section',
  templateUrl: './h1-features-section.component.html',
  styles: [
  ]
})
export class H1FeaturesSectionComponent implements OnInit {
  listOurFeature = Immutable.fromJS([]);

  private _listOurFeatureSubscription: Subscription | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
