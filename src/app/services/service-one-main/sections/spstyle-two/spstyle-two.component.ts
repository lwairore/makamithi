import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import * as Immutable from 'immutable';
import { Subscription } from 'rxjs';
import { ServiceAreaService } from 'src/app/services/service-area.service';

@Component({
  selector: 'mak-pit-spstyle-two',
  templateUrl: './spstyle-two.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SPStyleTwoComponent implements OnInit, AfterViewInit, OnDestroy {
  listService = Immutable.fromJS([]);

  private _listServiceSubscription: Subscription | undefined;

  showLoader = false;

  constructor(
    private _serviceAreaService: ServiceAreaService,
    private _changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.__listService();
  }

  ngOnDestroy(): void {
    this._unsubscribeListServiceSubscription();
  }

  private _unsubscribeListServiceSubscription() {
    if (this._listServiceSubscription instanceof Subscription) {
      this._listServiceSubscription.unsubscribe();
    }
  }

  private __listService() {
    if (!this.showLoader) {
      this.showLoader = true;

      this._manuallyTriggerChangeDetection();
    }

    this._listServiceSubscription = this._serviceAreaService
      .listOurFeature$().subscribe(details => {
        this.listService = Immutable.fromJS(details);

        if (!this.listService.isEmpty()) {
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
