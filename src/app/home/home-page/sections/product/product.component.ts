import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mak-pit-product',
  templateUrl: './product.component.html',
  styles: [
  ],
})
export class ProductComponent implements OnInit {
  products = [
    {
      flaticon: 'diet',
      title: 'Animal feeds'
    },
    {
      flaticon: 'tomato',
      title: 'Fertilizers'
    },
    {
      flaticon: 'pumpkin',
      title: 'Seeds'
    },
    {
      flaticon: 'vegetarian',
      title: 'Veterinary Products'
    },
    {
      flaticon: 'diet',
      title: 'Agro - Chemicals'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
