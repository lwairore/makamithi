import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Immutable from 'immutable';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mak-pit-h1-about-section',
  templateUrl: './h1-about-section.component.html',
  styles: [
  ]
})
export class H1AboutSectionComponent implements OnInit, OnDestroy {
  aboutSectionDetails = Immutable.fromJS({});

  private _retrieveAboutSectionSubscription: Subscription | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void { }

  private _unsubscribeRetrieveAboutSectionSubscription() {
    if (this._retrieveAboutSectionSubscription instanceof Subscription) {
      this._retrieveAboutSectionSubscription.unsubscribe();
    }
  }

}
