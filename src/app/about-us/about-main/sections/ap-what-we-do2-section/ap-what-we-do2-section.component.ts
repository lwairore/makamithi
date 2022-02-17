import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import * as Immutable from 'immutable';
import { forkJoin, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AboutUsService } from 'src/app/about-us/about-us.service';

@Component({
  selector: 'mak-pit-ap-what-we-do2-section',
  templateUrl: './ap-what-we-do2-section.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApWhatWeDo2SectionComponent implements OnInit, AfterViewInit, OnDestroy {
  listService = Immutable.fromJS([]);

  whatWeDoSectionDetails = Immutable.fromJS({});

  private _loadRequiredDetailsSubscription: Subscription | undefined;

  constructor(
    private _aboutUsService: AboutUsService,
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

  private _loadRequiredDetails() {
    const WHAT_WE_DO_SECTION_DETAILS$ = this._aboutUsService
      .retrieveWhatWeDoSection$();

    const LIST_SERVICE$ = this._aboutUsService
      .listOurFeature$();

    this._loadRequiredDetailsSubscription = forkJoin([
      WHAT_WE_DO_SECTION_DETAILS$.pipe(
        tap(details => {
          this.whatWeDoSectionDetails = Immutable.fromJS(details);
        })),
      LIST_SERVICE$.pipe(
        tap(details => {
          this.listService = Immutable.fromJS(details);
          console.log(this.listService);
        })),
    ])
      .subscribe(_ => {
        if (!this.whatWeDoSectionDetails.isEmpty() || !this.listService.isEmpty()) {
          this._manuallyTriggerChangeDetection();
        }
      }, err => console.error(err))
  }

  private _manuallyTriggerChangeDetection() {
    this._changeDetectorRef.detectChanges();
  }

}
