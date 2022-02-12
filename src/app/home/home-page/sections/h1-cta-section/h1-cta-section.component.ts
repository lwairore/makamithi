import { Component, OnInit } from '@angular/core';
import * as Immutable from 'immutable';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mak-pit-h1-cta-section',
  templateUrl: './h1-cta-section.component.html',
  styles: [
  ]
})
export class H1CtaSectionComponent implements OnInit {
  ctaSectionDetails = Immutable.fromJS({});

  private _retrieveVisitNowCtaSectionSubscription: Subscription | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  private _unsubscribeRetrieveVisitNowCtaSectionSubscription() {
    if (this._retrieveVisitNowCtaSectionSubscription instanceof Subscription) {
      this._retrieveVisitNowCtaSectionSubscription.unsubscribe();
    }
  }

}
