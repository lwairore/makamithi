import { Location } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { SeoService } from '@sharedModule/services/seo.service';
import { SeoSocialShareService } from 'ngx-seo';
import { Subscription } from 'rxjs';
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

  private _retrieveAboutUsSEODetails() { }

}
