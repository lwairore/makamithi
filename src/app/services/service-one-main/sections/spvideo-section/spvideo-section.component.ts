import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import * as Immutable from 'immutable';
import { Subscription } from 'rxjs';
import { ServiceAreaService } from 'src/app/services/service-area.service';

@Component({
  selector: 'mak-pit-spvideo-section',
  templateUrl: './spvideo-section.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SPVideoSectionComponent implements OnInit, AfterViewInit, OnDestroy {
  videoDetails = Immutable.fromJS({});

  private _retrieveVideoDetailsSubscription: Subscription | undefined;

  showLoader = false;

  constructor(
    private _serviceAreaService: ServiceAreaService,
    private _changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.__retrieveVideoDetails();
  }

  ngOnDestroy(): void {
    this._unsubscribeRetreiveServiceAreaDetailsSubscription();
  }

  private _unsubscribeRetreiveServiceAreaDetailsSubscription() {
    if (this._retrieveVideoDetailsSubscription instanceof Subscription) {
      this._retrieveVideoDetailsSubscription.unsubscribe();
    }
  }

  private __retrieveVideoDetails() {
    if (!this.showLoader) {
      this.showLoader = true;

      this._manuallyTriggerChangeDetection();
    }

    this._retrieveVideoDetailsSubscription = this._serviceAreaService
      .retrieveVideo$().subscribe(details => {
        this.videoDetails = Immutable.fromJS(details);

        if (!this.videoDetails.isEmpty()) {
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
