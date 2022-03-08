import { Location } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ScrollService } from '@sharedModule/services/scroll-service.service';
import { SeoService } from '@sharedModule/services/seo.service';
import { SeoSocialShareService } from 'ngx-seo';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'mak-pit-gallery-one-main',
  templateUrl: './gallery-one-main.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ScrollService,
  ]
})
export class GalleryOneMainComponent implements OnInit, AfterViewInit, OnDestroy {
  private _retrieveGallerySEODetailsSubscription: Subscription | undefined;

  constructor(
    private _seoService: SeoService,
    private _seoSocialShareService: SeoSocialShareService,
    private _location: Location,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._retrieveGallerySEODetails();
  }

  ngOnDestroy(): void {
    this._unsubscribeRetrieveGallerySEODetailsSubscription();
  }

  private _unsubscribeRetrieveGallerySEODetailsSubscription() {
    if (this._retrieveGallerySEODetailsSubscription instanceof Subscription) {
      this._retrieveGallerySEODetailsSubscription.unsubscribe();
    }
  }

  private _retrieveGallerySEODetails() {
    this._retrieveGallerySEODetailsSubscription = this._seoService
      .retrieveGallerySEODetails$()
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
