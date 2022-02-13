import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
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
export class HomePageComponent implements OnInit, AfterViewInit, OnDestroy {
  private _retrieveHomeSEODetailsSubscription: Subscription | undefined;

  constructor(
    private _seoService: SeoService,
    private _seoSocialShareService: SeoSocialShareService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._retrieveHomeSEODetails();
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
        })
      }, err => console.error(err))
  }
}
