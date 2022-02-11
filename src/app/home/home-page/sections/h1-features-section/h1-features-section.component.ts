import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import * as Immutable from 'immutable';
import { forkJoin, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HomeService } from 'src/app/home/home.service';

@Component({
  selector: 'mak-pit-h1-features-section',
  templateUrl: './h1-features-section.component.html',
  styles: [
  ]
})
export class H1FeaturesSectionComponent implements OnInit, AfterViewInit, OnDestroy {
  listOurFeature = Immutable.fromJS([]);

  featureSection = Immutable.fromJS({});

  private _loadRequiredDataSubscription: Subscription | undefined;

  constructor(
    private _homeService: HomeService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._loadRequiredData();
  }

  ngOnDestroy(): void {
    this._unsubscribeListOurFeatureSubscription();
  }

  private _unsubscribeListOurFeatureSubscription() {
    if (this._loadRequiredDataSubscription instanceof Subscription) {
      this._loadRequiredDataSubscription.unsubscribe();
    }
  }

  private _loadRequiredData() {
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
      .subscribe(details => {

      }, err => console.error(err))
  }

}
