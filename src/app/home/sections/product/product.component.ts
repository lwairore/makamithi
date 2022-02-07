import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mak-pit-product',
  templateUrl: './product.component.html',
  styles: [
  ],
})
export class ProductComponent implements OnInit {
  tabLists = [
    {
      tabTitle: 'Vegetables',
      flaticon: 'diet',
      tabPanel: [
        {
          id: 1,
          img: {
            alt: 'product',
            src: '/assets/img/product/product1.png'
          },
          href: '/shop-details',
          price: '$49.99',
          title: 'Broccoli Head',
        },
        {
          id: 2,
          img: {
            alt: 'image',
            src: '/assets/img/product/product3.png'
          },
          href: '/shop-details',
          price: '$25.99',
          title: 'Breadfruit Head',
        },
        {
          id: 3,
          img: {
            alt: 'image',
            src: '/assets/img/product/product4.png'
          },
          href: '/shop-details',
          price: '$49.99',
          title: 'Blackberries Head',
        },

      ]
    },
    {
      tabTitle: 'Shallot',
      flaticon: 'tomato',
      tabPanel: [
        {
          id: 1,
          img: {
            alt: 'product',
            src: '/assets/img/product/product4.png'
          },
          href: '/shop-details',
          price: '$49.99',
          title: 'Blackberries Head',
        },
        {
          id: 2,
          img: {
            alt: 'image',
            src: '/assets/img/product/product1.png'
          },
          href: '/shop-details',
          price: '$49.99',
          title: 'Broccoli Head',
        },
        {
          id: 3,
          img: {
            alt: 'image',
            src: '/assets/img/product/product2.png'
          },
          href: '/shop-details',
          price: '$29.99',
          title: 'Avocado Head',
        },
        {
          id: 4,
          img: {
            alt: 'image',
            src: '/assets/img/product/product3.png'
          },
          href: '/shop-details',
          price: '$25.99',
          title: 'Breadfruit Head',
        },
      ]
    },
    {
      tabTitle: 'Pumpkin',
      flaticon: 'pumpkin',
      tabPanel: [
        {
          id: 2,
          img: {
            alt: 'image',
            src: '/assets/img/product/product1.png'
          },
          href: '/shop-details',
          price: '$49.99',
          title: 'Broccoli Head',
        },
        {
          id: 1,
          img: {
            alt: 'product',
            src: '/assets/img/product/product4.png'
          },
          href: '/shop-details',
          price: '$49.99',
          title: 'Blackberries Head',
        },
        {
          id: 4,
          img: {
            alt: 'image',
            src: '/assets/img/product/product3.png'
          },
          href: '/shop-details',
          price: '$25.99',
          title: 'Breadfruit Head',
        },
        {
          id: 3,
          img: {
            alt: 'image',
            src: '/assets/img/product/product2.png'
          },
          href: '/shop-details',
          price: '$29.99',
          title: 'Avocado Head',
        },
      ]
    },
    {
      tabTitle: 'Orange',
      flaticon: 'vegetarian',
      tabPanel: [
        {
          id: 1,
          img: {
            alt: 'product',
            src: '/assets/img/product/product4.png'
          },
          href: '/shop-details',
          price: '$49.99',
          title: 'Blackberries Head',
        },
        {
          id: 2,
          img: {
            alt: 'image',
            src: '/assets/img/product/product1.png'
          },
          href: '/shop-details',
          price: '$49.99',
          title: 'Broccoli Head',
        },
        {
          id: 4,
          img: {
            alt: 'image',
            src: '/assets/img/product/product3.png'
          },
          href: '/shop-details',
          price: '$25.99',
          title: 'Breadfruit Head',
        },
        {
          id: 3,
          img: {
            alt: 'image',
            src: '/assets/img/product/product2.png'
          },
          href: '/shop-details',
          price: '$29.99',
          title: 'Avocado Head',
        },
      ]
    },
  ]




  constructor() { }

  ngOnInit(): void {
  }

}
