import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { PartnerService } from '@sharedModule/services/partner.service';
import * as Immutable from 'immutable';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { forkJoin, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'mak-pit-brand',
  templateUrl: './brand.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandComponent implements OnInit, AfterViewInit, OnDestroy {
  customOptions: OwlOptions = {
    loop: true,
    margin: 40,
    autoplay: true,
    // responsiveClass: true,
    dots: false,
    center: false,
    nav: false,
    slideBy: 4,
    items: 1,
    responsive: {
      1920: {
        items: 6
      },
      1366: {
        items: 6
      },
      1536: {
        items: 6
      },
      1440: {
        items: 6
      },
      1280: {
        items: 6
      },
      1600: {
        items: 6
      },
      1370: {
        items: 6
      },
      1605: {
        items: 6
      },
      768: {
        items: 4
      },
      1030: {
        items: 6
      },
      1024: {
        items: 6
      },
      1200: {
        items: 6
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
        items: 2
      },
      412: {
        items: 1
      },
      320: {
        items: 1
      },
      480: {
        items: 2
      },
      568: {
        items: 5
      },
      667: {
        items: 5
      },
      736: {
        items: 5
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
        items: 5
      },
      601: {
        items: 5
      },
      962: {
        items: 5
      },
      810: {
        items: 5
      },
      910: {
        items: 5
      },
      600: {
        items: 5
      },
      834: {
        items: 5
      },
      1112: {
        items: 6
      },
      906: {
        items: 5
      },
    }
  }
  listPartner = Immutable.fromJS([]);

  partnerAreaSectionDetails = Immutable.fromJS({});

  private _loadRequiredDetailsSubscription: Subscription | undefined;

  showLoader = false;

  constructor(
    private _partnerService: PartnerService,
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
    if (!this.showLoader) {
      this.showLoader = true;

      this._manuallyTriggerChangeDetection();
    }

    const RETRIEVE_PARTNER_AREA_SECTION$ = this._partnerService
      .retrievePartnerAreaSection$();

    const LIST_PARTNER$ = this._partnerService.listPartner$();

    this._loadRequiredDetailsSubscription = forkJoin([
      RETRIEVE_PARTNER_AREA_SECTION$
        .pipe(
          tap(details => {
            this.partnerAreaSectionDetails = Immutable.fromJS(details);
          })),
      LIST_PARTNER$
        .pipe(
          tap(details => {
            this.listPartner = Immutable.fromJS(details);
          }))
    ]).subscribe(_ => {
      console.log("this.partnerAreaSectionDetailsthis.partnerAreaSectionDetails")
      console.log(this.partnerAreaSectionDetails)
      if (
        !this.partnerAreaSectionDetails.isEmpty() ||
        !this.listPartner.isEmpty()) {
        this.showLoader = false;

        this._manuallyTriggerChangeDetection();
      }
    }, err => {
      console.error(err);

      this.showLoader = false;
    })
  }


}
