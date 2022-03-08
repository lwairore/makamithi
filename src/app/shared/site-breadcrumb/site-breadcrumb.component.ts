import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SiteBreadcrumbService } from '@sharedModule/services/site-breadcrumb.service';
import * as Immutable from 'immutable';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mak-pit-site-breadcrumb',
  templateUrl: './site-breadcrumb.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteBreadcrumbComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() pageTitle = 'Blog';

  siteBreadcrumbDetails = Immutable.fromJS({});

  private _retrieveSiteBreadcrumbDetailsSubscription: Subscription | undefined;

  showLoader = false;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _siteBreadcrumbService: SiteBreadcrumbService,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._retrieveSiteBreadcrumbDetails();
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

  private _retrieveSiteBreadcrumbDetails() {
    if (!this.showLoader) {
      this.showLoader = true;

      this._manuallyTriggerChangeDetection();
    }

    this._retrieveSiteBreadcrumbDetailsSubscription = this._siteBreadcrumbService
      .retrieveSiteBreadcrumbDetails$()
      .subscribe(details => {
        this.siteBreadcrumbDetails = Immutable.fromJS(details);

        if (!this.siteBreadcrumbDetails.isEmpty()) {
          this.showLoader = false;

          this._manuallyTriggerChangeDetection();
        }
      }, err => {
        console.error(err);

        this.showLoader = false;
      })
  }
}
