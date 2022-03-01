import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as Immutable from 'immutable';
import { Subscription } from 'rxjs';
import { ServiceAreaService } from 'src/app/services/service-area.service';

@Component({
  selector: 'mak-pit-spservice-pricing-section',
  templateUrl: './spservice-pricing-section.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SPServicePricingSectionComponent implements OnInit, AfterViewInit, OnDestroy {
  priceSectionDetails = Immutable.fromJS({});

  plans = Immutable.fromJS([]);

  private _retrievePriceSectionDetailsSubscription: Subscription | undefined;

  constructor(
    private _serviceAreaService: ServiceAreaService,
    private _changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }


  ngAfterViewInit(): void {
    this.__retrievePriceSectionDetails();
  }

  ngOnDestroy(): void {
    this._unsubscribeRetreivePriceSectionDetailsSubscription();
  }

  private _unsubscribeRetreivePriceSectionDetailsSubscription() {
    if (this._retrievePriceSectionDetailsSubscription instanceof Subscription) {
      this._retrievePriceSectionDetailsSubscription.unsubscribe();
    }
  }

  private __retrievePriceSectionDetails() {
    this._retrievePriceSectionDetailsSubscription = this._serviceAreaService
      .retrievePriceSection$().subscribe(details => {
        this.priceSectionDetails = Immutable.fromJS(details);

        if (!this.priceSectionDetails.isEmpty()) {
          this.manuallyTriggerChangeDetection();
        }
      }, err => console.error(err));
  }

   manuallyTriggerChangeDetection() {
    this._changeDetectorRef.detectChanges();
  }

}
