import { Location } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScrollService } from '@sharedModule/services/scroll-service.service';
import { convertItemToNumeric, convertItemToString, isANumber } from '@sharedModule/utilities';
import * as Immutable from 'immutable';
import { SeoSocialShareService } from 'ngx-seo';
import { forkJoin, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GalleryService } from 'src/app/gallery/gallery.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'mak-pit-gpgallery-details-one-section',
  templateUrl: './gpgallery-details-one-section.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GPGalleryDetailsOneSectionComponent implements OnInit, AfterViewInit, OnDestroy {
  galleryDetails = Immutable.fromJS({});

  gallerySectionDetails = Immutable.fromJS({});

  private _loadRequiredDetailsSubscription: Subscription | undefined;

  private _routeParamsSubscription: Subscription | undefined;

  private _routeParams = Immutable.Map({});

  paginationDetailsForReviews = Immutable.Map({
    next: 0,
  });

  showLoader = false;

  constructor(
    private _galleryService: GalleryService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _activatedRoute: ActivatedRoute,
    private _scrollService: ScrollService,
    private _seoSocialShareService: SeoSocialShareService,
    private _location: Location,
  ) { }

  ngOnInit(): void {
    this._extractRouteParams();
  }

  ngAfterViewInit(): void {
    this._loadRequiredDetails();
  }

  ngOnDestroy(): void {
    this._unsubscribeRouteParamsSubscription();

    this._unsubscribeLoadRequiredDetailsSubscription();
  }

  private _extractRouteParams() {
    this._routeParamsSubscription = this._activatedRoute.params
      .subscribe(params => {
        const GALLERY_ID = convertItemToNumeric(
          params['galleryID']);

        if (!isANumber(GALLERY_ID)) {
          return;
        }

        this._routeParams = this._routeParams.set(
          'galleryID', GALLERY_ID);

        this._scrollToTop();
      });
  }


  private _unsubscribeRouteParamsSubscription() {
    if (this._routeParamsSubscription instanceof Subscription) {
      this._routeParamsSubscription.unsubscribe();
    }
  }

  private _unsubscribeLoadRequiredDetailsSubscription() {
    if (this._loadRequiredDetailsSubscription instanceof Subscription) {
      this._loadRequiredDetailsSubscription.unsubscribe();
    }
  }

  private _loadRequiredDetails() {
    if (!this.showLoader) {
      this.showLoader = true;

      this._manuallyTriggerChangeDetection();
    }

    const GALLERY_ID = this._routeParams.get('galleryID');

    if (!isANumber(GALLERY_ID)) {
      return;
    }

    const RETRIEVE_GALLERY_DETAIL$ = this._galleryService
      .retrieveGalleryDetail$(convertItemToString(GALLERY_ID));
    const RETRIEVE_GALLERY_DETAIL_SECTION$ = this._galleryService
      .retrieveGalleryDetailSection$();

    this._loadRequiredDetailsSubscription = forkJoin([
      RETRIEVE_GALLERY_DETAIL$.pipe(
        tap(details => {
          this.galleryDetails = Immutable.fromJS(details);

          this._seoSocialShareService.setData({
            title: details.title,
            keywords: details.keywords,
            description: details.description,
            image: details.layoutImage.src,
            imageAuxData: {
              height: 770,
              width: 1170,
              secureUrl: details.layoutImage.src,
              alt: details.layoutImage.alt,
            },
            type: 'post',
            author: 'Makamithi Agrovet',
            section: 'article',
            published: details.createdAt,
            modified: details.modifiedDate,
            url: `${environment.hostURL}${this._location.path()}`,
          });
        })),
      RETRIEVE_GALLERY_DETAIL_SECTION$.pipe(
        tap(details => {
          this.gallerySectionDetails = Immutable.fromJS(details)
        }))
    ])
      .subscribe(_ => {
        if (!this.galleryDetails.isEmpty() || !this.gallerySectionDetails.isEmpty()) {
          this.showLoader = false;

          this._manuallyTriggerChangeDetection();
        }
      }, (err) => {
        console.error(err);

        this.showLoader = false;
      });
  }


  private _scrollToTop() {
    this._scrollService.scrollToPosition(0, 0);
  }

  private _manuallyTriggerChangeDetection() {
    this._changeDetectorRef.detectChanges();
  }

}
