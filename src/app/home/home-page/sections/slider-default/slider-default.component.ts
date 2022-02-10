import { Component, OnDestroy, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import * as Immutable from 'immutable';
import { HomeService } from 'src/app/home/home.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mak-pit-slider-default',
  templateUrl: './slider-default.component.html',
  styles: [
  ]
})
export class SliderDefaultComponent implements OnInit, OnDestroy {
  customOptions: OwlOptions = {
    loop: true,
    margin: 10,
    autoplay: true,
    // responsiveClass: true,
    slideBy: 1,
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 1,
        slideBy: 1,
        nav: false,
      },
      991: {
        items: 1,
        slideBy: 1,
        nav: false,
      },
      1024: {
        items: 1,
        slideBy: 1,
        autoplay: true
      }
    },
  }

  bannerAds = Immutable.fromJS([]);

  private _listBannerAdSubscription: Subscription | undefined;

  constructor(
    private _homeService: HomeService
  ) { }

  ngOnInit(): void {
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
    this._listBannerAdSubscription = this._homeService.listBannerAds$()
      .subscribe(ads =>
        this.bannerAds = Immutable.fromJS([ads]),
        err => console.error(err));
  }

}
