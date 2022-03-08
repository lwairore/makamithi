import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import * as Immutable from 'immutable';
import { forkJoin, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HomeService } from 'src/app/home/home.service';

@Component({
  selector: 'mak-pit-h1-features-section',
  templateUrl: './h1-features-section.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class H1FeaturesSectionComponent implements OnInit, AfterViewInit, OnDestroy {
  listOurFeature = Immutable.fromJS([]);

  featureSection = Immutable.fromJS({});

  private _loadRequiredDataSubscription: Subscription | undefined;

  showLoader = false;

  constructor(
    private _homeService: HomeService,
    private _changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._loadRequiredData();
  }

  ngOnDestroy(): void {
    this._unsubscribeListOurFeatureSubscription();
  }

  private _manuallyTriggerChangeDetection() {
    this._changeDetectorRef.detectChanges();
  }

  private _unsubscribeListOurFeatureSubscription() {
    if (this._loadRequiredDataSubscription instanceof Subscription) {
      this._loadRequiredDataSubscription.unsubscribe();
    }
  }

  private _loadRequiredData() {
    if (!this.showLoader) {
      this.showLoader = true;

      this._manuallyTriggerChangeDetection();
    }

    const listOurFeature$ = this._homeService
      .listOurFeature$();

    const retrieveFeatureSection$ = this._homeService
      .retrieveFeatureSection$();

    this._loadRequiredDataSubscription = forkJoin([
      listOurFeature$.pipe(
        tap(details => {
          this.listOurFeature = Immutable.fromJS(details);
        })),
      retrieveFeatureSection$.pipe(
        tap(details => {
          this.featureSection = Immutable.fromJS(details);
        })
      )
    ])
      .subscribe(_ => {
        if (!this.listOurFeature.isEmpty() || !this.featureSection.isEmpty()) {
          this.showLoader = false;

          this._manuallyTriggerChangeDetection();
        }
      }, err => {
        console.error(err);

        this.showLoader = false;
      })
  }

}
