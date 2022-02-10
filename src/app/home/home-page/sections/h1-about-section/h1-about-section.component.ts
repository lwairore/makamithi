import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import * as Immutable from 'immutable';
import { Subscription } from 'rxjs';
import { HomeService } from 'src/app/home/home.service';

@Component({
  selector: 'mak-pit-h1-about-section',
  templateUrl: './h1-about-section.component.html',
  styles: [
  ]
})
export class H1AboutSectionComponent implements OnInit, AfterViewInit, OnDestroy {
  aboutSectionDetails = Immutable.fromJS({});

  private _retrieveAboutSectionSubscription: Subscription | undefined;

  constructor(
    private _homeService: HomeService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._retrieveAboutSection();
  }

  ngOnDestroy(): void {
    this._unsubscribeRetrieveAboutSectionSubscription();
  }

  private _unsubscribeRetrieveAboutSectionSubscription() {
    if (this._retrieveAboutSectionSubscription instanceof Subscription) {
      this._retrieveAboutSectionSubscription.unsubscribe();
    }
  }

  private _retrieveAboutSection() {
    this._retrieveAboutSectionSubscription = this._homeService
      .retrieveAboutSection$().subscribe(
        details => {
          this.aboutSectionDetails = Immutable.fromJS(details);
        }, err => console.error(err));
  }

}
