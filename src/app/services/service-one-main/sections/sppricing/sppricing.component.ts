import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mak-pit-sppricing',
  templateUrl: './sppricing.component.html',
  styles: [
  ]
})
export class SPPricingComponent implements OnInit {
  listPlans = [
    {
      image: 'assets/img/icon/p1.png',
      title: 'Regular Plan',
      price: 2855,
      benefits: [
        {
          title: 'Money Back Guarantee',
        },
        {
          title: 'India Organic Foods',
        },
        {
          title: 'BD Pineaple Juice',
        },
        {
          title: 'USA Organic Juice'
        },
        {
          title: 'Fresh Food Item',
        },
        {
          title: '100% Pure Item'
        },
      ]
    },

    {
      image: 'assets/img/icon/p2.png',
      price: 5055,
      title: 'Premium Plan',
      benefits: [
        {
          title: 'Money Back Guarantee',
        },
        {
          title: 'India Organic Foods',
        },
        {
          title: 'BD Pineaple Juice',
        },
        {
          title: 'USA Organic Juice'
        },
        {
          title: 'Fresh Food Item',
        },
        {
          title: '100% Pure Item'
        },
      ]
    },

    {
      image: 'assets/img/icon/p3.png',
      price: 10555,
      title: 'Diamond Plan',
      benefits: [
        {
          title: 'Money Back Guarantee',
        },
        {
          title: 'India Organic Foods',
        },
        {
          title: 'BD Pineaple Juice',
        },
        {
          title: 'USA Organic Juice'
        },
        {
          title: 'Fresh Food Item',
        },
        {
          title: '100% Pure Item'
        },
      ]
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
