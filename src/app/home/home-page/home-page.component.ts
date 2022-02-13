import { Component, OnDestroy, OnInit } from '@angular/core';
import { SeoService } from '@sharedModule/seo.service';
import * as Immutable from 'immutable';
import { SeoSocialShareData, SeoSocialShareService } from 'ngx-seo';
import { Subscription } from 'rxjs';
import { HomeService } from '../home.service';

@Component({
  selector: 'mak-pit-home-page',
  templateUrl: './home-page.component.html',
  styles: [
  ],
  providers: [
    HomeService,
  ]
})
export class HomePageComponent implements OnInit, OnDestroy {
  private _retrieveHomeSEODetailsSubscription: Subscription | undefined;

  constructor(
    private _seoService: SeoService,
    private _seoSocialShareService: SeoSocialShareService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._unsubscribeRetrieveHomeSEODetailsSubscription();
  }

  private _unsubscribeRetrieveHomeSEODetailsSubscription() {
    if (this._retrieveHomeSEODetailsSubscription instanceof Subscription) {
      this._retrieveHomeSEODetailsSubscription.unsubscribe();
    }
  }

  private _retrieveHomeSEODetails() {
    this._retrieveHomeSEODetailsSubscription = this._seoService
      .retrieveHomeSEODetails$()
      .subscribe(details => {

      }, err => console.error(err))
  }
}
