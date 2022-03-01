import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import * as Immutable from 'immutable';
import { Subscription } from 'rxjs';
import { ServiceAreaService } from 'src/app/services/service-area.service';

@Component({
  selector: 'mak-pit-spstyle-one',
  templateUrl: './spstyle-one.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SPStyleOneComponent implements OnInit, AfterViewInit, OnDestroy {
  serviceAreaSectionDetails = Immutable.fromJS({});

  private _retrieveServiceAreaSectionDetailsSubscription: Subscription | undefined;

  constructor(
    private _serviceAreaService: ServiceAreaService,
    private _changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.__retrieveServiceAreaSectionDetails();
  }

  ngOnDestroy(): void {
    this._unsubscribeRetreiveServiceAreaDetailsSubscription();
  }

  private _unsubscribeRetreiveServiceAreaDetailsSubscription() {
    if (this._retrieveServiceAreaSectionDetailsSubscription instanceof Subscription) {
      this._retrieveServiceAreaSectionDetailsSubscription.unsubscribe();
    }
  }

  private __retrieveServiceAreaSectionDetails() {
    this._retrieveServiceAreaSectionDetailsSubscription = this._serviceAreaService
      .retrieveServiceAreaSection$().subscribe(details => {
        this.serviceAreaSectionDetails = Immutable.fromJS(details);

        if (!this.serviceAreaSectionDetails.isEmpty()) {
          this._manuallyTriggerChangeDetection();
        }
      }, err => console.error(err));
  }

  private _manuallyTriggerChangeDetection() {
    this._changeDetectorRef.detectChanges();
  }
}
