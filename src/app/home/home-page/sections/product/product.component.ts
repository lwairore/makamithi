import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import * as Immutable from 'immutable';
import { Subscription } from 'rxjs';
import { HomeService } from 'src/app/home/home.service';

@Component({
  selector: 'mak-pit-product',
  templateUrl: './product.component.html',
  styles: [
  ],
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

  productCategories = Immutable.fromJS([]);

  private _listProductCategoriesSubscription: Subscription | undefined;

  constructor(
    private _homeService: HomeService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._listProductCategory();
   }

  ngOnDestroy(): void {
    this._unsubscribeListProductCategoriesSubscription();
  }

  trackById(loopIndex: number, item: any) {
    return item.id;
  }

  private _unsubscribeListProductCategoriesSubscription() {
    if (this._listProductCategoriesSubscription instanceof Subscription) {
      this._listProductCategoriesSubscription.unsubscribe();
    }
  }

  private _listProductCategory() {
    this._listProductCategoriesSubscription = this._homeService
      .listProductCategory$()
      .subscribe(details => {
        this.productCategories = Immutable.fromJS(details);
      }, err => console.error(err));
  }

}
