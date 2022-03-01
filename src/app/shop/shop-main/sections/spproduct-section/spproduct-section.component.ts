import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductFormatHttpResponse } from '@sharedModule/custom-types';
import { ScrollService } from '@sharedModule/services/scroll-service.service';
import { convertItemToNumeric, convertItemToString, ExpectedType, isANumber, whichValueShouldIUse } from '@sharedModule/utilities';
import { generateFakeObjectArray } from '@sharedModule/utilities/generate-fake-objects.util';
import * as Immutable from 'immutable';
import { of, Subscription } from 'rxjs';
import { ShopService } from 'src/app/shop/shop.service';

@Component({
  selector: 'mak-pit-spproduct-section',
  templateUrl: './spproduct-section.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SPProductSectionComponent implements OnInit, AfterViewInit, OnDestroy {
  products = Immutable.fromJS([]);

  paginationDetails = Immutable.Map({
    count: 0,
    next: 0,
  });

  private _listProductSubscription: Subscription | undefined;

  private _routeParamsSubscription: Subscription | undefined;

  isFirstPage = false;

  private _routeParams = Immutable.Map({});

  // sortByOptions = Immutable.fromJS([
  //   {
  //     value: 'Top Sales',
  //     slug: 'top_sales',
  //   },
  //   {
  //     value: 'New Product',
  //     slug: 'new_product',
  //   },
  //   {
  //     value: 'A to Z Product',
  //     slug: 'a2z',
  //   },
  // ]);

  constructor(
    private _shopService: ShopService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _activatedRoute: ActivatedRoute,
    private _scrollService: ScrollService,
  ) { }

  ngOnInit(): void {
    this._extractCurrentPageNumber();
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this._unsubscribeRouteParamsSubscription();

    this._unsubscribeListProductSubscription();
  }


  private _resetProductsOnRouteChange() {
    this.products = Immutable.fromJS([]);
  }

  getTotalNumberOfResults() {
    const TOTAL_RESULTS = this.paginationDetails.get('count');

    return isANumber(TOTAL_RESULTS) ? TOTAL_RESULTS : 0;
  }

  getCurrentLengthOfProducts() {
    const CURRENT_LENGTH = this.products.toList().size;

    return CURRENT_LENGTH;
  }

  fakeObjectArray() {
    const totalNumberOfPages = this.paginationDetails
      .get('totalNumberOfPages');

    if (!isANumber(totalNumberOfPages)) {
      return [];
    }
    return generateFakeObjectArray(totalNumberOfPages);
  };

  private _determineIfWeAreAtTheFirstPage(pageNumber: number) {
    if (pageNumber === 1) {
      if (!this.isFirstPage) {
        this.isFirstPage = true;
      }
    } else {
      if (this.isFirstPage) {
        this.isFirstPage = false;
      }
    }
  }

  markPageNavItemActive(pageNumber: number) {
    console.log({ pageNumber });

    const storedPageNumber = convertItemToNumeric(
      this._routeParams.get('pageNumber'));

    console.log({ storedPageNumber })

    if (!isANumber(storedPageNumber)) {
      return false;
    }

    return (storedPageNumber - 1) === pageNumber;
  }

  private _extractCurrentPageNumber() {
    this._routeParamsSubscription = this._activatedRoute.params
      .subscribe(params => {
        console.log(params);

        const pageNumber = whichValueShouldIUse(
          params['pageNumber'], 1, ExpectedType.NUMBER);

        this._determineIfWeAreAtTheFirstPage(pageNumber);

        this._routeParams = this._routeParams.set(
          'pageNumber', pageNumber);

        this._resetProductsOnRouteChange();

        this._listProduct();
      });
  }

  fetchPrevious() {
    const CURRENT_PAGE_NUMBER = convertItemToNumeric(
      this._routeParams.get('pageNumber'));

    if (!isANumber(CURRENT_PAGE_NUMBER)) {
      return 0;
    }

    const totalNumberOfPages = convertItemToNumeric(
      this.paginationDetails
        .get('totalNumberOfPages'));

    if (!isANumber(totalNumberOfPages)) {
      return 0;
    }

    if (CURRENT_PAGE_NUMBER === 1) {
      return 0;
    } else {
      return CURRENT_PAGE_NUMBER - 1;
    }
  }

  getMyCurrentPageNumber() {
    const CURRENT_PAGE_NUMBER = convertItemToNumeric(
      this._routeParams.get('pageNumber'));

    if (!isANumber(CURRENT_PAGE_NUMBER)) {
      return 0;
    }

    return CURRENT_PAGE_NUMBER;
  }

  fetchNext() {
    const CURRENT_PAGE_NUMBER = convertItemToNumeric(
      this._routeParams.get('pageNumber'));

    if (!isANumber(CURRENT_PAGE_NUMBER)) {
      return 0;
    }

    const totalNumberOfPages = convertItemToNumeric(
      this.paginationDetails
        .get('totalNumberOfPages'));

    if (!isANumber(totalNumberOfPages)) {
      return 0;
    }

    const NEXT_PAGE = CURRENT_PAGE_NUMBER + 1;

    return (NEXT_PAGE > totalNumberOfPages) ? 0 : NEXT_PAGE;
  }

  private _unsubscribeRouteParamsSubscription() {
    if (this._routeParamsSubscription instanceof Subscription) {
      this._routeParamsSubscription.unsubscribe();
    }
  }

  private _unsubscribeListProductSubscription() {
    if (this._listProductSubscription instanceof Subscription) {
      this._listProductSubscription.unsubscribe();
    }
  }

  private _computeTheTotalNumberOfPages(
    count: number) {
    if (!isANumber(count)) {
      return
    }

    const PAGE_SIZE = 6;

    const totalNumberOfPages = Math.ceil(count / PAGE_SIZE);

    this.paginationDetails = this.paginationDetails.set(
      'count', count);

    this.paginationDetails = this.paginationDetails.set(
      'totalNumberOfPages', totalNumberOfPages);
  }

  private _listProduct() {
    const FETCH_PAGE_NUMBER = convertItemToString(
      this._routeParams.get('pageNumber'));

    this._listProductSubscription = this._shopService.
      listProductForShopSection$(FETCH_PAGE_NUMBER)
      .subscribe(details => {
        console.log({ details })
        // this.products = Immutable.mergeDeepWith(
        //   (oldVal, newVal) => oldVal + newVal,
        //   this.products, details.results
        // )
        const count = convertItemToNumeric(details.count);
        if (isANumber(count)) {
          this._computeTheTotalNumberOfPages(count
          );
        }

        const newVal = Immutable.fromJS(details.results);

        console.log({ newVal })

        this.products = Immutable.mergeDeep(
          this.products, newVal);

        if (!newVal.isEmpty()) {
          this._manuallyTriggerChangeDetection();
        }

        console.log("this.products");

        console.log(this.products);

        this._scrollToTop();
      })
  }

  private _scrollToTop() {
    this._scrollService.scrollToPosition(0, 0);
  }

  private _manuallyTriggerChangeDetection() {
    this._changeDetectorRef.detectChanges();
  }
}
