import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import * as Immutable from 'immutable';
import { Subscription } from 'rxjs';
import { HomeService } from 'src/app/home/home.service';

@Component({
  selector: 'mak-pit-h1-cta-section',
  templateUrl: './h1-cta-section.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class H1CtaSectionComponent implements OnInit, AfterViewInit, OnDestroy {
  ctaSectionDetails = Immutable.fromJS({});

  private _retrieveVisitNowCtaSectionSubscription: Subscription | undefined;

  constructor(
    private _homeService: HomeService,
    private _changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void { }

  ngOnDestroy(): void {
    this._unsubscribeRetrieveVisitNowCtaSectionSubscription();
  }

  private _unsubscribeRetrieveVisitNowCtaSectionSubscription() {
    if (this._retrieveVisitNowCtaSectionSubscription instanceof Subscription) {
      this._retrieveVisitNowCtaSectionSubscription.unsubscribe();
    }
  }

  private _manuallyTriggerChangeDetection() {
    this._changeDetectorRef.detectChanges();
  }
}
