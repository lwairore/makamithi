import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import * as Immutable from 'immutable';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mak-pit-apabout4-section',
  templateUrl: './apabout4-section.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class APAbout4SectionComponent implements OnInit, AfterViewInit, OnDestroy {
  apAboutSectionDetails = Immutable.fromJS({});

  private _retrieveApAboutSectionSubscription: Subscription | undefined;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void { }

  ngOnDestroy(): void {
    this._unsubscribeRetrieveApAboutSectionSubscription();
  }

  private _manuallyTriggerChangeDetection() {
    this._changeDetectorRef.detectChanges();
  }

  private _unsubscribeRetrieveApAboutSectionSubscription() {
    if (this._retrieveApAboutSectionSubscription instanceof Subscription) {
      this._retrieveApAboutSectionSubscription.unsubscribe();
    }
  }

  private _retrieveApAboutSection() {
  }

}
