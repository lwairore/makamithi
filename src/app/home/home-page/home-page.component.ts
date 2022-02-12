import { Component, OnInit } from '@angular/core';
import { SeoSocialShareService } from 'ngx-seo';
import { HomeService } from '../home.service';

@Component({
  selector: 'mak-pit-home-page',
  templateUrl: './home-page.component.html',
  styles: [
  ],
  providers: [
    HomeService,
  ]
})
export class HomePageComponent implements OnInit {

  constructor(
    private seoService: SeoSocialShareService
  ) { }

  ngOnInit(): void {
  }

}
