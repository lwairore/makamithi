import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { convertItemToString, isANumber } from '@sharedModule/utilities';
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
  products = [
    {
      flaticon: 'diet',
      title: 'Animal feeds',
      items: [
        {
          image: 'assets/img/product/product1.png',
          title: 'Broccoli Head',
          price: 5499
        },
        {
          image: 'assets/img/product/product2.png',
          title: 'Avocado Head',
          price: 3299
        },
        {
          image: 'assets/img/product/product3.png',
          title: 'Breadfruit Head',
          price: 2859
        },
        {
          image: 'assets/img/product/product4.png',
          title: 'Blackberries Head',
          price: 4999
        },
      ]
    },
    {
      flaticon: 'tomato',
      title: 'Fertilizers',
      items: [
        {
          image: 'assets/img/product/product4.png',
          title: 'Blackberries Head',
          price: 4999
        },
        {
          image: 'assets/img/product/product1.png',
          title: 'Broccoli Head',
          price: 5499
        },
        {
          image: 'assets/img/product/product2.png',
          title: 'Avocado Head',
          price: 3299
        },
        {
          image: 'assets/img/product/product3.png',
          title: 'Breadfruit Head',
          price: 2859
        },
      ]
    },
    {
      flaticon: 'pumpkin',
      title: 'Seeds',
      items: [
        {
          image: 'assets/img/product/product3.png',
          title: 'Breadfruit Head',
          price: 2859
        },
        {
          image: 'assets/img/product/product4.png',
          title: 'Blackberries Head',
          price: 4999
        },
        {
          image: 'assets/img/product/product1.png',
          title: 'Broccoli Head',
          price: 5499
        },
        {
          image: 'assets/img/product/product2.png',
          title: 'Avocado Head',
          price: 3299
        },
      ]
    },
    {
      flaticon: 'vegetarian',
      title: 'Veterinary Products',
      items: [
        {
          image: 'assets/img/product/product1.png',
          title: 'Broccoli Head',
          price: 5499
        },
        {
          image: 'assets/img/product/product3.png',
          title: 'Breadfruit Head',
          price: 2859
        },
        {
          image: 'assets/img/product/product4.png',
          title: 'Blackberries Head',
          price: 4999
        },
        {
          image: 'assets/img/product/product2.png',
          title: 'Avocado Head',
          price: 3299
        },
      ]
    },
    {
      flaticon: 'diet',
      title: 'Agro - Chemicals',
      items: [
        {
          image: 'assets/img/product/product4.png',
          title: 'Blackberries Head',
          price: 4999
        },
        {
          image: 'assets/img/product/product1.png',
          title: 'Broccoli Head',
          price: 5499
        },
        {
          image: 'assets/img/product/product2.png',
          title: 'Avocado Head',
          price: 3299
        },
        {
          image: 'assets/img/product/product3.png',
          title: 'Breadfruit Head',
          price: 2859
        },
      ]
    },
  ]

  productsAvailable = Immutable.Map({});

  productCategories = Immutable.fromJS([]);

  private _listProductCategoriesSubscription: Subscription | undefined;

  private _listProductSubscription: Subscription | undefined;

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

  handleTabSelectedEvent(productID?: number) {
    if (!isANumber(productID)) {
      return;
    }

    this._listProduct(
      convertItemToString(productID));
  }

  private _listProduct(productID: string) {
    this._listProductSubscription = this._homeService.listProduct$(
      convertItemToString(productID))
      .subscribe(details => {
        this.productsAvailable = this.productsAvailable
          .set(
            productID, details);

        console.log("this.productsAvailable");
        console.log(this.productsAvailable);
      }, err => console.error(err))
  }

  private _manuallyTriggerChangeDetection() {
    this._changeDetectorRef.detectChanges();
  }

}
