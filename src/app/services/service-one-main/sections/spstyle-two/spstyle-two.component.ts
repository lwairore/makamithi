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
    this._listServiceSubscription = this._serviceAreaService
      .listOurFeature$().subscribe(details => {
        this.listService = Immutable.fromJS(details);

        console.log(this.listService)

        if (!this.listService.isEmpty()) {
          this._manuallyTriggerChangeDetection();
        }
      }, err => console.error(err));
  }

  private _manuallyTriggerChangeDetection() {
    this._changeDetectorRef.detectChanges();
  }

}
