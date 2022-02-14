import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as Immutable from 'immutable';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mak-pit-site-breadcrumb',
  templateUrl: './site-breadcrumb.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteBreadcrumbComponent implements OnInit, OnDestroy {
  @Input() pageTitle = 'Blog';

  siteBreadcrumbDetails = Immutable.fromJS({});

  private _retrieveSiteBreadcrumbDetailsSubscription: Subscription | undefined;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._unsubscribeRetrieveSiteBreadcrumbDetailsSubscription();
  }

  private _unsubscribeRetrieveSiteBreadcrumbDetailsSubscription() {
    if (this._retrieveSiteBreadcrumbDetailsSubscription instanceof Subscription) {
      this._retrieveSiteBreadcrumbDetailsSubscription.unsubscribe();
    }
  }

  private _manuallyTriggerChangeDetection() {
    this._changeDetectorRef.detectChanges();
  }
}
