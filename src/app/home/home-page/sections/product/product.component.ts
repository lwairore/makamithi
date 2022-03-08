import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { convertItemToString, isANumber } from '@sharedModule/utilities';
import * as Immutable from 'immutable';
import { forkJoin, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HomeService } from 'src/app/home/home.service';

@Component({
  selector: 'mak-pit-product',
  templateUrl: './product.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit, AfterViewInit, OnDestroy {
  productsAvailable = Immutable.Map({});

  productCategories = Immutable.fromJS([]);

  productAreaSectionDetails = Immutable.fromJS({});

  private _loadRequiredDetailsSubscription: Subscription | undefined;

  private _listProductSubscription: Subscription | undefined;

  showLoader = false;

  constructor(
    private _homeService: HomeService,
    private _changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._loadRequiredDetails();
  }

  ngOnDestroy(): void {
    this._unsubscribeLoadRequiredDetailsSubscription();

    this._unsubscribeListProductSubscription();
  }

  trackById(loopIndex: number, item: any) {
    return item.id;
  }

  private _unsubscribeLoadRequiredDetailsSubscription() {
    if (this._loadRequiredDetailsSubscription instanceof Subscription) {
      this._loadRequiredDetailsSubscription.unsubscribe();
    }
  }

  private _unsubscribeListProductSubscription() {
    if (this._listProductSubscription instanceof Subscription) {
      this._listProductSubscription.unsubscribe();
    }
  }

  private _loadRequiredDetails() {
    if (!this.showLoader) {
      this.showLoader = true;

      this._manuallyTriggerChangeDetection();
    }

    const LIST_CATEGORIES$ = this._homeService
      .listProductCategory$().pipe(
        tap(details => {
          this.productCategories = Immutable.fromJS(details);
        }));

    const RETRIEVE_PRODUCT_AREA_SECTION$ = this._homeService
      .retrieveProductAreaSection$()
      .pipe(tap(details => {
        this.productAreaSectionDetails = Immutable.fromJS(details);
      }))

    this._loadRequiredDetailsSubscription = forkJoin([
      LIST_CATEGORIES$,
      RETRIEVE_PRODUCT_AREA_SECTION$
    ])
      .subscribe(_ => {
        if (!this.productCategories.isEmpty() || !this.productAreaSectionDetails.isEmpty()) {
          this.showLoader = false;

          this._manuallyTriggerChangeDetection();
        }
      }, err => {
        console.error(err);
      
        this.showLoader = false;
      });
  }

  handleTabSelectedEvent(productCategoryID?: number) {
    if (!isANumber(productCategoryID)) {
      return;
    }

    this._listProduct(
      convertItemToString(productCategoryID));
  }

  private _listProduct(productCategoryID: string) {
    if (this.productsAvailable.has(productCategoryID)) {
      return;
    }

    this._listProductSubscription = this._homeService.listProductForACategory$(
      productCategoryID)
      .subscribe(details => {
        const newVal = Immutable.fromJS(details);

        this.productsAvailable = this.productsAvailable
          .set(
            productCategoryID, newVal);

        this._manuallyTriggerChangeDetection();
      }, err => console.error(err))
  }

  private _manuallyTriggerChangeDetection() {
    this._changeDetectorRef.detectChanges();
  }

}
