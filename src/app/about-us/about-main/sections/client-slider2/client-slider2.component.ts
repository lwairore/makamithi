import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ClientSliderService } from '@sharedModule/services/client-slider.service';
import * as Immutable from 'immutable';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { forkJoin, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'mak-pit-client-slider2',
  templateUrl: './client-slider2.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientSlider2Component implements OnInit, AfterViewInit, OnDestroy {
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    // responsiveClass: true,
    dots: false,
    center: false,
    // nav: false,
    items: 1,
    slideBy: 1,
    responsive: {
      768: {
        items: 2,
        slideBy: 1,
      },
      1024: {
        items: 2,
        slideBy: 1,
      },
      1440: {
        items: 3,
        slideBy: 1,
      }
    },
  }

  clientReviewSectionDetails = Immutable.fromJS({});

  listClientReviews = Immutable.fromJS([]);

  private _loadRequiredDetailsSubscription: Subscription | undefined;

  showLoader = false;

  constructor(
    private _clientSliderService: ClientSliderService,
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
    if (!this.showLoader) {
      this.showLoader = true;

      this._manuallyTriggerChangeDetection();
    }

    const CLIENT_REVIEW_SECTION_DETAILS$ = this._clientSliderService
      .retrieveClientReviewSection$();

    const LIST_CLIENT_REVIEW$ = this._clientSliderService
      .listClientReview$();

    this._loadRequiredDetailsSubscription = forkJoin([
      CLIENT_REVIEW_SECTION_DETAILS$.pipe(
        tap(details => {
          this.clientReviewSectionDetails = Immutable.fromJS(details);
        })),
      LIST_CLIENT_REVIEW$.pipe(
        tap(details => {
          this.listClientReviews = Immutable.fromJS(details);
        })),
    ])
      .subscribe(_ => {
        if (!this.clientReviewSectionDetails.isEmpty() || !this.listClientReviews.isEmpty()) {
          this.showLoader = false;

          this._manuallyTriggerChangeDetection();
        }
      }, err => {
        console.error(err);

        this.showLoader = false;
      })
  }

  private _manuallyTriggerChangeDetection() {
    this._changeDetectorRef.detectChanges();
  }

}
