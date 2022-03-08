import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SocialMediaService } from '@sharedModule/services/social-media.service';
import * as Immutable from 'immutable';
import { forkJoin, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'mak-pit-top-header2',
  templateUrl: './top-header2.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopHeader2Component implements OnInit, AfterViewInit, OnDestroy {
  private _loadRequiredDetailsSubscription: Subscription | undefined;

  showLoader = false;

  socialMedias = Immutable.fromJS([]);

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _socialMediaService: SocialMediaService,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._loadRequiredDetails();
  }

  ngOnDestroy(): void {
    this._unsubscribeLoadRequiredDetailsSubscription();
  }

  private _unsubscribeLoadRequiredDetailsSubscription() {
    if (this._loadRequiredDetailsSubscription instanceof Subscription) {
      this._loadRequiredDetailsSubscription.unsubscribe();
    }
  }

  private _loadRequiredDetails() {
    if (!this.showLoader) {
      this.showLoader = true;

      this._manuallyTriggerChangeDetection();
    }

    const LIST_SOCIAL_MEDIA$ = this._socialMediaService
      .listSocialMedia$()
      .pipe(
        tap(details => {
          console.log("LIST_SOCIAL_MEDIA$")
          console.log({ details })
          this.socialMedias = Immutable.fromJS(details);
        }));

    this._loadRequiredDetailsSubscription = forkJoin([
      LIST_SOCIAL_MEDIA$,
    ])
      .subscribe(_ => {
        if (!this.socialMedias.isEmpty()) {
          this.showLoader = false;

          this._manuallyTriggerChangeDetection();
        }
      }, err => {
        console.error(err);

        this.showLoader = false;
      });
  }

  private _manuallyTriggerChangeDetection() {
    this._changeDetectorRef.detectChanges();
  }

}
