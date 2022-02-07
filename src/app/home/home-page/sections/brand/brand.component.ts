import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'mak-pit-brand',
  templateUrl: './brand.component.html',
  styles: [
  ]
})
export class BrandComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    margin: 10,
    autoplay: true,
    // responsiveClass: true,
    dots: false,
    center: false,
    nav: false,
    slideBy: 1,
    responsive: {
      1024: {
        items: 4,
        slideBy: 1,
      },
      991: {
        items: 3,
        slideBy: 1,
      },
      480: {
        items: 2,
        slideBy: 1,
      },

    },
  }

  constructor() { }

  ngOnInit(): void {
  }

}
