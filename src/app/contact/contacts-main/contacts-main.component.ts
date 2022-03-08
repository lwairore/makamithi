import { Location } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { SeoService } from '@sharedModule/services/seo.service';
import { SeoSocialShareService } from 'ngx-seo';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'mak-pit-contacts-main',
  templateUrl: './contacts-main.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsMainComponent implements OnInit, AfterViewInit, OnDestroy {
  private _retrieveContactUsSEODetailsSubscription: Subscription | undefined;

  constructor(
    private _seoService: SeoService,
    private _seoSocialShareService: SeoSocialShareService,
    private _location: Location,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._retrieveContactUsSEODetails();
  }

  ngOnDestroy(): void {
    this._unsubscribeRetrieveContactUsSEODetailsSubscription();
  }

  private _unsubscribeRetrieveContactUsSEODetailsSubscription() {
    if (this._retrieveContactUsSEODetailsSubscription instanceof Subscription) {
      this._retrieveContactUsSEODetailsSubscription.unsubscribe();
    }
  }

  private _retrieveContactUsSEODetails() {
    this._retrieveContactUsSEODetailsSubscription = this._seoService
      .retrieveContactUsSEODetails$()
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
