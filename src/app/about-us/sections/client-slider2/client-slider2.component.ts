import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'mak-pit-client-slider2',
  templateUrl: './client-slider2.component.html',
  styles: [
  ]
})
export class ClientSlider2Component implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    // responsiveClass: true,
    dots: false,
    center: false,
    // nav: false,
    items: 1,
    slideBy: 1,
    responsive: {
      768: {
        items: 2,
        slideBy: 1,
      },
      1024: {
        items: 2,
        slideBy: 1,
      },
      1440: {
        items: 3,
        slideBy: 1,
      }
    },
  }

  constructor() { }

  ngOnInit(): void {
  }

}
