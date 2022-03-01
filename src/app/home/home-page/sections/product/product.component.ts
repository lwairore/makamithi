import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { convertItemToString, isANumber } from '@sharedModule/utilities';
import { generateFakeObjectArray } from '@sharedModule/utilities/generate-fake-objects.util';
import * as Immutable from 'immutable';
import { Subscription } from 'rxjs';
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

  private _listProductCategoriesSubscription: Subscription | undefined;

  private _listProductSubscription: Subscription | undefined;

  fakeObjectArray = generateFakeObjectArray();

  constructor(
    private _homeService: HomeService,
    private _changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._listProductCategory();
  }

  ngOnDestroy(): void {
    this._unsubscribeListProductCategoriesSubscription();

    this._unsubscribeListProductSubscription();
  }

  trackById(loopIndex: number, item: any) {
    return item.id;
  }

  private _unsubscribeListProductCategoriesSubscription() {
    if (this._listProductCategoriesSubscription instanceof Subscription) {
      this._listProductCategoriesSubscription.unsubscribe();
    }
  }

  private _unsubscribeListProductSubscription() {
    if (this._listProductSubscription instanceof Subscription) {
      this._listProductSubscription.unsubscribe();
    }
  }

  private _listProductCategory() {
    this._listProductCategoriesSubscription = this._homeService
      .listProductCategory$()
      .subscribe(details => {
        this.productCategories = Immutable.fromJS(details);

        if (!this.productCategories.isEmpty()) {
          this._manuallyTriggerChangeDetection();
        }
      }, err => console.error(err));
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
        this.productsAvailable = this.productsAvailable
          .set(
            productCategoryID, details);

        console.log("this.productsAvailable");
        console.log(this.productsAvailable);
        console.log(this.productsAvailable.get(productCategoryID))

        this._manuallyTriggerChangeDetection();
      }, err => console.error(err))
  }

  private _manuallyTriggerChangeDetection() {
    this._changeDetectorRef.detectChanges();
  }

}
