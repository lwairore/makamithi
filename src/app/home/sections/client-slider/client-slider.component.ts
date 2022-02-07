import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'mak-pit-client-slider',
  templateUrl: './client-slider.component.html',
  styles: [
  ]
})
export class ClientSliderComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    margin: 10,
    autoplay: true,
    // responsiveClass: true,
    dots: false,
    center: false,
    nav: false,
    items: 1,
    slideBy: 1,
    responsive: {
      480: {
        items: 1,
        slideBy: 1,
        nav: false,
      },
      991: {
        items: 2,
        slideBy: 1,
        nav: false,
      },
      1024: {
        items: 3,
        slideBy: 1,
        autoplay: true
      }
    },
  }

  constructor() { }

  ngOnInit(): void {
  }

}
