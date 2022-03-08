import { Location } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ScrollService } from '@sharedModule/services/scroll-service.service';
import { SeoService } from '@sharedModule/services/seo.service';
import { SeoSocialShareService } from 'ngx-seo';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'mak-pit-shop-main',
  templateUrl: './shop-main.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ScrollService
  ]
})
export class ShopMainComponent implements OnInit, AfterViewInit, OnDestroy {

  private _retrieveShopSEODetailsSubscription: Subscription | undefined;

  constructor(
    private _seoService: SeoService,
    private _seoSocialShareService: SeoSocialShareService,
    private _location: Location,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._retrieveShopSEODetails();
  }

  ngOnDestroy(): void {
    this._unsubscribeRetrieveShopSEODetailsSubscription();
  }

  private _unsubscribeRetrieveShopSEODetailsSubscription() {
    if (this._retrieveShopSEODetailsSubscription instanceof Subscription) {
      this._retrieveShopSEODetailsSubscription.unsubscribe();
    }
  }

  private _retrieveShopSEODetails() {
    this._retrieveShopSEODetailsSubscription = this._seoService
      .retrieveShopSEODetails$()
      .subscribe(details => {
        this._seoSocialShareService.setData({
          title: details.title,
          keywords: details.keywords,
          description: details.description,
          image: details.image.src,
          imageAuxData: {
            width: details.image.width,
            height: details.image.height,
            secureUrl: details.image.src,
            alt: details.image.alt,
          },
          type: details.type,
          author: details.author,
          section: details.section,
          published: details.published,
          modified: details.modified,
          url: `${environment.hostURL}${this._location.path()}`,
        })
      }, err => console.error(err))
  }

}
