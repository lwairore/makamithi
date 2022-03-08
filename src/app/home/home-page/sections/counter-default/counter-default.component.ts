import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import * as Immutable from 'immutable';
import { forkJoin, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HomeService } from 'src/app/home/home.service';

@Component({
  selector: 'mak-pit-counter-default',
  templateUrl: './counter-default.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterDefaultComponent implements OnInit, AfterViewInit, OnDestroy {
  counterAreaSectionDetails = Immutable.fromJS({});

  badges = Immutable.fromJS([]);

  private _loadRequiredDetailsSubscription: Subscription | undefined;

  showLoader = false;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _homeService: HomeService,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._loadRequiredDetails();
  }

  ngOnDestroy(): void {
    this._unsubscribeLoadRequiredDetailsSubscription();
  }

  private _unsubscribeLoadRequiredDetailsSubscription() {
    if (this._loadRequiredDetailsSubscription instanceof Subscription) {
      this._loadRequiredDetailsSubscription.unsubscribe();
    }
  }

  private _manuallyTriggerChangeDetection() {
    this._changeDetectorRef.detectChanges();
  }

  private _loadRequiredDetails() {
    if (!this.showLoader) {
      this.showLoader = true;

      this._manuallyTriggerChangeDetection();
    }

    const RETRIEVE_COUNTER_AREA_SECTION$ = this._homeService
      .retrieveCounterAreaSection$();

    const LIST_BADGE_GALLERY$ = this._homeService
      .listBadge$();

    this._loadRequiredDetailsSubscription = forkJoin([
      RETRIEVE_COUNTER_AREA_SECTION$.pipe(
        tap(details => this.counterAreaSectionDetails = Immutable.fromJS(details))
      ),
      LIST_BADGE_GALLERY$.pipe(
        tap(details => this.badges = Immutable.fromJS(details)))
    ])
      .subscribe(_ => {
        if (!this.counterAreaSectionDetails.isEmpty()) {
          this.showLoader = false;

          this._manuallyTriggerChangeDetection();
        }
      }, err => {
        console.error(err);

        this.showLoader = false;
      });
  }
}
