import { Component, OnInit } from '@angular/core';
import { SeoSocialShareData, SeoSocialShareService } from 'ngx-seo';
import { Subscription } from 'rxjs';
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
  private _retrieveHomeSEODetailsSubscription: Subscription | undefined;

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
