import { Location } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { SeoService } from '@sharedModule/services/seo.service';
import { SeoSocialShareService } from 'ngx-seo';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AboutUsService } from '../about-us.service';

@Component({
  selector: 'mak-pit-about-main',
  templateUrl: './about-main.component.html',
  styles: [
  ],
  providers: [
    AboutUsService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutMainComponent implements OnInit, AfterViewInit, OnDestroy {
  private _retrieveAboutUsSEODetailsSubscription: Subscription | undefined;

  constructor(
    private _seoService: SeoService,
    private _seoSocialShareService: SeoSocialShareService,
    private _location: Location,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._retrieveAboutUsSEODetails();
  }

  ngOnDestroy(): void {
    this._unsubscribeRetrieveAboutUsSEODetailsSubscription();
  }

  private _unsubscribeRetrieveAboutUsSEODetailsSubscription() {
    if (this._retrieveAboutUsSEODetailsSubscription instanceof Subscription) {
      this._retrieveAboutUsSEODetailsSubscription.unsubscribe();
    }
  }

  private _retrieveAboutUsSEODetails() {
    this._retrieveAboutUsSEODetailsSubscription = this._seoService
      .retrieveAboutUsSEODetails$()
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
