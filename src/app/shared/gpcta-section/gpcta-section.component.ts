import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { WorkWithUsCtaService } from '@sharedModule/services/work-with-us-cta.service';
import * as Immutable from 'immutable';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mak-pit-gpcta-section',
  templateUrl: './gpcta-section.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GPCtaSectionComponent implements OnInit, AfterViewInit, OnDestroy {
  ctaSectionDetails = Immutable.fromJS({});

  private _retrieveCtaSectionDetailsSubscription: Subscription | undefined;

  showLoader = false;

  constructor(
    private _workWithUsCtaService: WorkWithUsCtaService,
    private _changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this._retrieveCtaSectionDetails();
  }

  ngOnDestroy(): void {
    this._unsubscribeLoadRequiredDetailsSubscription();
  }

  private _manuallyTriggerChangeDetection() {
    this._changeDetectorRef.detectChanges();
  }

  private _unsubscribeLoadRequiredDetailsSubscription() {
    if (this._retrieveCtaSectionDetailsSubscription instanceof Subscription) {
      this._retrieveCtaSectionDetailsSubscription.unsubscribe();
    }
  }

  private _retrieveCtaSectionDetails() {
    if (!this.showLoader) {
      this.showLoader = true;

      this._manuallyTriggerChangeDetection();
    }

    this._retrieveCtaSectionDetailsSubscription = this._workWithUsCtaService
      .retrieveWorkWithUsCtaSection$()
      .subscribe(details => {
        this.ctaSectionDetails = Immutable.fromJS(details);

        if (!this.ctaSectionDetails.isEmpty()) {
          this.showLoader = false;

          this._manuallyTriggerChangeDetection();
        }
      }, (err) => {
        console.error(err);

        this.showLoader = false;
      });
  }

}
