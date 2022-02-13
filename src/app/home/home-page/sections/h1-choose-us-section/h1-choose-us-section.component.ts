import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import * as Immutable from 'immutable';
import { forkJoin, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HomeService } from 'src/app/home/home.service';

@Component({
  selector: 'mak-pit-h1-choose-us-section',
  templateUrl: './h1-choose-us-section.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class H1ChooseUsSectionComponent implements OnInit, AfterViewInit, OnDestroy {
  listCoreValue = Immutable.fromJS([]);

  chooseUsSectionDetails = Immutable.fromJS({});

  private _loadRequiredDetailsSubscription: Subscription | undefined;

  constructor(
    private _homeService: HomeService,
    private _changeDetectorRef: ChangeDetectorRef,
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
    const RETRIEVE_WHY_CHOOSE_US_SECTION$ = this._homeService
      .retrieveWhyChooseUsSection$();

    const LIST_CORE_VALUE$ = this._homeService.listCoreValue$();

    this._loadRequiredDetailsSubscription = forkJoin([
      RETRIEVE_WHY_CHOOSE_US_SECTION$
        .pipe(
          tap(details => {
            this.chooseUsSectionDetails = Immutable.fromJS(details);
          })),
      LIST_CORE_VALUE$
        .pipe(
          tap(details => {
            this.listCoreValue = Immutable.fromJS(details);
          }))
    ]).subscribe(_ => {
      if (!this.chooseUsSectionDetails.isEmpty()) {
        this._manuallyTriggerChangeDetection();
      }
    }, err => console.error(err))
  }

  coreValueTrackByFn(loopIndex: number, item: any) {
    return item.get('id');
  }
}
