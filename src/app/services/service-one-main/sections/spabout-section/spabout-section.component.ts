import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import * as Immutable from 'immutable';
import { Subscription } from 'rxjs';
import { ServiceAreaService } from 'src/app/services/service-area.service';

@Component({
  selector: 'mak-pit-spabout-section',
  templateUrl: './spabout-section.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SPAboutSectionComponent implements OnInit, AfterViewInit, OnDestroy {
  serviceAboutSectionDetails = Immutable.fromJS({});

  private _retrieveServiceAboutSectionDetailsSubscription: Subscription | undefined;

  showLoader = false;

  constructor(
    private _serviceAreaService: ServiceAreaService,
    private _changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.__retrieveServiceAboutSectionDetails();
  }

  ngOnDestroy(): void {
    this._unsubscribeRetreiveServiceAboutDetailsSubscription();
  }

  private _unsubscribeRetreiveServiceAboutDetailsSubscription() {
    if (this._retrieveServiceAboutSectionDetailsSubscription instanceof Subscription) {
      this._retrieveServiceAboutSectionDetailsSubscription.unsubscribe();
    }
  }

  private __retrieveServiceAboutSectionDetails() {
    if (!this.showLoader) {
      this.showLoader = true;

      this._manuallyTriggerChangeDetection();
    }

    this._retrieveServiceAboutSectionDetailsSubscription = this._serviceAreaService
      .retrieveServiceAboutSection$().subscribe(details => {
        this.serviceAboutSectionDetails = Immutable.fromJS(details);

        if (!this.serviceAboutSectionDetails.isEmpty()) {
          this.showLoader = false;

          this._manuallyTriggerChangeDetection();
        }
      }, err => {
        console.error(err);

        this.showLoader = false;
      });
  }

  private _manuallyTriggerChangeDetection() {
    this._changeDetectorRef.detectChanges();
  }

}
