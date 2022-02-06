import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'mak-pit-home-page',
  templateUrl: './home-page.component.html',
  styles: [
  ]
})
export class HomePageComponent implements OnInit {
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
