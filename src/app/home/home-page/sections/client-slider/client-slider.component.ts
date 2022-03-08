import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, } from '@angular/core';
import { ClientSliderService } from '@sharedModule/services/client-slider.service';
import * as Immutable from 'immutable';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { forkJoin, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'mak-pit-client-slider',
  templateUrl: './client-slider.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientSliderComponent implements OnInit, AfterViewInit, OnDestroy {
  customOptions: OwlOptions = {
    loop: true,
    margin: 10,
    autoplay: true,
    // responsiveClass: true,
    dots: false,
    center: false,
    nav: false,
    items: 1,
    slideBy: 1,
    responsive: {
      1920: {
        items: 3
      },
      1366: {
        items: 3
      },
      1536: {
        items: 3
      },
      1440: {
        items: 3
      },
      1280: {
        items: 3
      },
      1600: {
        items: 3
      },
      1370: {
        items: 3
      },
      1605: {
        items: 3
      },
      768: {
        items: 4
      },
      1030: {
        items: 3
      },
      1024: {
        items: 3
      },
      1200: {
        items: 3
      },
      360: {
        items: 1
      },
      414: {
        items: 1
      },
      375: {
        items: 1
      },
      390: {
        items: 1
      },
      428: {
        items: 1
      },
      412: {
        items: 1
      },
      320: {
        items: 1
      },
      480: {
        items: 1
      },
      568: {
        items: 2
      },
      667: {
        items: 2
      },
      736: {
        items: 2
      },
      384: {
        items: 1
      },
      218: {
        items: 1
      },
      281: {
        items: 1
      },
      800: {
        items: 2
      },
      601: {
        items: 2
      },
      962: {
        items: 2
      },
      810: {
        items: 2
      },
      910: {
        items: 2
      },
      600: {
        items: 2
      },
      834: {
        items: 2
      },
      1112: {
        items: 3
      },
      906: {
        items: 2
      },
    }
  }

  clientReviewSectionDetails = Immutable.fromJS({});

  listClientReviews = Immutable.fromJS([]);

  private _loadRequiredDetailsSubscription: Subscription | undefined;

  showLoader = false;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _clientSliderService: ClientSliderService,
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
