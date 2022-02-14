import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SeoService } from '@sharedModule/services/seo.service';
import { SeoSocialShareService } from 'ngx-seo';
import { AboutUsService } from '../about-us.service';

@Component({
  selector: 'mak-pit-about-main',
  templateUrl: './about-main.component.html',
  styles: [
  ],
  providers: [
    AboutUsService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutMainComponent implements OnInit {

  constructor(
    private _seoService: SeoService,
    private _seoSocialShareService: SeoSocialShareService,
  ) { }

  ngOnInit(): void {
  }

  private _retrieveAboutUsSEODetails() { }

}
