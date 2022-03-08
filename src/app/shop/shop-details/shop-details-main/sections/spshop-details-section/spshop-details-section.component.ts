import { Location } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScrollService } from '@sharedModule/services/scroll-service.service';
import { convertItemToNumeric, convertItemToString, isANumber } from '@sharedModule/utilities';
import * as Immutable from 'immutable';
import { SeoSocialShareService } from 'ngx-seo';
import { Subscription } from 'rxjs';
import { ShopService } from 'src/app/shop/shop.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'mak-pit-spshop-details-section',
  templateUrl: './spshop-details-section.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SPShopDetailsSectionComponent implements OnInit, AfterViewInit, OnDestroy {
  productDetails = Immutable.fromJS({});

  private _retrieveProductDetailsSubscription: Subscription | undefined;

  private _routeParamsSubscription: Subscription | undefined;

  private _routeParams = Immutable.Map({});

  reviews = Immutable.fromJS([]);

  paginationDetailsForReviews = Immutable.Map({
    next: 0,
  })

  private _listProductReviewSubscription: Subscription | undefined;

  hasAlreadyFetchedReviewsAtLeastOnce = false;

  showLoader = false;

  constructor(
    private _shopService: ShopService,
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
    this._retrieveProductDetails();
  }

  ngOnDestroy(): void {
    this._unsubscribeRouteParamsSubscription();

    this._unsubscribeRetrieveProductDetailsSubscription();

    this._unsubscribeListProductReviewSubscription();
  }

  private _unsubscribeListProductReviewSubscription() {
    if (this._listProductReviewSubscription instanceof Subscription) {
      this._listProductReviewSubscription.unsubscribe();
    }
  }

  handleTabSelectedEvent(event?: any) {
    if (!this.hasAlreadyFetchedReviewsAtLeastOnce) {
      this.listProductReview();
    }
  }

  private _extractRouteParams() {
    this._routeParamsSubscription = this._activatedRoute.params
      .subscribe(params => {

        const PRODUCT_ID = convertItemToNumeric(
          params['productID']);

        if (!isANumber(PRODUCT_ID)) {
          return;
        }

        this._routeParams = this._routeParams.set(
          'productID', PRODUCT_ID);

        this._scrollToTop();
      });
  }


  private _unsubscribeRouteParamsSubscription() {
    if (this._routeParamsSubscription instanceof Subscription) {
      this._routeParamsSubscription.unsubscribe();
    }
  }

  private _unsubscribeRetrieveProductDetailsSubscription() {
    if (this._retrieveProductDetailsSubscription instanceof Subscription) {
      this._retrieveProductDetailsSubscription.unsubscribe();
    }
  }

  private _retrieveProductDetails() {
    if (!this.showLoader) {
      this.showLoader = true;

      this._manuallyTriggerChangeDetection();
    }

    const PRODUCT_ID = this._routeParams.get('productID');

    if (!isANumber(PRODUCT_ID)) {
      return;
    }

    this._retrieveProductDetailsSubscription = this._shopService
      .retrieveProductDetail$(convertItemToString(PRODUCT_ID))
      .subscribe(details => {
        this.productDetails = Immutable.fromJS(details);

        console.log({details})

        if (!this.productDetails.isEmpty()) {
          this._seoSocialShareService.setData({
            title: details.title,
            keywords: details.keywords,
            description: details.description,
            image: details.productImages[0].src,
            imageAuxData: {
              secureUrl: details.productImages[0].src,
              alt: details.productImages[0].alt,
            },
            type: 'post',
            author: 'Makamithi Agrovet',
            section: 'article',
            published: details.createdAt,
            modified: details.modifiedDate,
            url: `${environment.hostURL}${this._location.path()}`,
          });

          this.showLoader = false;

          this._manuallyTriggerChangeDetection();
        }
      }, (err) => console.error(err));
  }

  listProductReview() {
    const PRODUCT_ID = convertItemToString(
      this._routeParams.get('productID'));

    if (!isANumber(PRODUCT_ID)) {
      return;
    }

    let FETCH_PAGE_NUMBER = convertItemToNumeric(
      this.paginationDetailsForReviews.get('next'));

    if (!isANumber(FETCH_PAGE_NUMBER)) {
      return;
    }

    if (FETCH_PAGE_NUMBER === 0) {
      FETCH_PAGE_NUMBER = 1;
    }

    this._listProductReviewSubscription = this._shopService
      .listProductReview$(PRODUCT_ID, FETCH_PAGE_NUMBER)
      .subscribe(details => {
        this.paginationDetailsForReviews = this.paginationDetailsForReviews
          .set('next', convertItemToNumeric(
            details.next));

        const newVal = Immutable.fromJS(details.results);

        this.reviews = Immutable.mergeDeep(
          this.reviews, newVal);

        if (!newVal.isEmpty()) {
          this._manuallyTriggerChangeDetection();
        }

        if (!this.hasAlreadyFetchedReviewsAtLeastOnce) {
          this.hasAlreadyFetchedReviewsAtLeastOnce = true;
        }
      })
  }

  private _scrollToTop() {
    this._scrollService.scrollToPosition(0, 0);
  }

  private _manuallyTriggerChangeDetection() {
    this._changeDetectorRef.detectChanges();
  }
}
