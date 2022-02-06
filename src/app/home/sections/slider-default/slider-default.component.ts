import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'mak-pit-slider-default',
  templateUrl: './slider-default.component.html',
  styles: [
  ]
})
export class SliderDefaultComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    margin: 10,
    autoplay: true,
    // responsiveClass: true,
    slideBy: 1,
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 1,
        slideBy: 1,
        nav: false,
      },
      991: {
        items: 1,
        slideBy: 1,
        nav: false,
      },
      1024: {
        items: 1,
        slideBy: 1,
        autoplay: true
      }
    },
  }

  constructor() { }

  ngOnInit(): void {
  }

}
