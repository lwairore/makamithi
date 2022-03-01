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
    this._retrieveVideoDetailsSubscription = this._serviceAreaService
      .retrieveVideo$().subscribe(details => {
        this.videoDetails = Immutable.fromJS(details);

        if (!this.videoDetails.isEmpty()) {
          this._manuallyTriggerChangeDetection();
        }
      }, err => console.error(err));
  }

  private _manuallyTriggerChangeDetection() {
    this._changeDetectorRef.detectChanges();
  }
}
