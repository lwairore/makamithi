import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import * as Immutable from 'immutable';
import { HomeService } from 'src/app/home/home.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mak-pit-slider-default',
  templateUrl: './slider-default.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderDefaultComponent implements OnInit, AfterViewInit, OnDestroy {
  customOptions: OwlOptions = {
    loop: true,
    margin: 10,
    autoplay: true,
    slideBy: 1,
    items: 1,
    responsiveRefreshRate: 1,
    responsive: {
      1920: {
        items: 1
      },
      1366: {
        items: 1
      },
      1536: {
        items: 1
      },
      1440: {
        items: 1
      },
      1280: {
        items: 1
      },
      1600: {
        items: 1
      },
      1370: {
        items: 1
      },
      1605: {
        items: 1
      },
      768: {
        items: 1
      },
      1030: {
        items: 1
      },
      1024: {
        items: 1
      },
      1200: {
        items: 1
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
        items: 1
      },
      667: {
        items: 1
      },
      736: {
        items: 1
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
        items: 1
      },
      601: {
        items: 1
      },
      962: {
        items: 1
      },
      810: {
        items: 1
      },
      910: {
        items: 1
      },
      600: {
        items: 1
      },
      834: {
        items: 1
      },
      1112: {
        items: 1
      },
      906: {
        items: 1
      },
    }
  }

  bannerAds = Immutable.fromJS([]);

  private _listBannerAdSubscription: Subscription | undefined;

  showLoader = false;

  constructor(
    private _homeService: HomeService,
    private _changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._listBannerAds();
  }

  ngOnDestroy(): void {
    this._unsubscribeListBannerAdSubscription();
  }

  private _unsubscribeListBannerAdSubscription() {
    if (this._listBannerAdSubscription instanceof Subscription) {
      this._listBannerAdSubscription.unsubscribe();
    }
  }

  private _listBannerAds() {
    if (!this.showLoader) {
      this.showLoader = true;

      this._manuallyTriggerChangeDetection();
    }

    this._listBannerAdSubscription = this._homeService.listBannerAds$()
      .subscribe(ads => {
        this.bannerAds = Immutable.fromJS(ads);

        if (!this.bannerAds.isEmpty()) {
          this.showLoader = false;

          this._manuallyTriggerChangeDetection();
        }
      },
        err => {
          console.error(err);

          this.showLoader = false;
        });
  }

  private _manuallyTriggerChangeDetection() {
    this._changeDetectorRef.detectChanges();
  }

}
