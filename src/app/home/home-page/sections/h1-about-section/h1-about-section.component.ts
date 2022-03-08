import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import * as Immutable from 'immutable';
import { Subscription } from 'rxjs';
import { HomeService } from 'src/app/home/home.service';

@Component({
  selector: 'mak-pit-h1-about-section',
  templateUrl: './h1-about-section.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class H1AboutSectionComponent implements OnInit, AfterViewInit, OnDestroy {
  aboutSectionDetails = Immutable.fromJS({});

  private _retrieveAboutSectionSubscription: Subscription | undefined;

  showLoader = false;

  constructor(
    private _homeService: HomeService,
    private _changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._retrieveAboutSection();
  }

  ngOnDestroy(): void {
    this._unsubscribeRetrieveAboutSectionSubscription();
  }

  private _manuallyTriggerChangeDetection() {
    this._changeDetectorRef.detectChanges();
  }

  private _unsubscribeRetrieveAboutSectionSubscription() {
    if (this._retrieveAboutSectionSubscription instanceof Subscription) {
      this._retrieveAboutSectionSubscription.unsubscribe();
    }
  }

  private _retrieveAboutSection() {
    if (!this.showLoader) {
      this.showLoader = true;

      this._manuallyTriggerChangeDetection();
    }

    this._retrieveAboutSectionSubscription = this._homeService
      .retrieveAboutSection$().subscribe(
        details => {
          this.aboutSectionDetails = Immutable.fromJS(details);

          if (!this.aboutSectionDetails.isEmpty()) {
            this.showLoader = false;

            this._manuallyTriggerChangeDetection();
          }

        }, err => {
          console.error(err);
          this.showLoader = false;
        });
  }

}
