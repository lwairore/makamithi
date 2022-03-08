import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderService } from '@sharedModule/services/header.service';
import { SocialMediaService } from '@sharedModule/services/social-media.service';
import * as Immutable from 'immutable';
import { forkJoin, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'mak-pit-top-header',
  templateUrl: './top-header.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopHeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  private _loadRequiredDetailsSubscription: Subscription | undefined;

  sectionDetails = Immutable.fromJS({});

  socialMedias = Immutable.fromJS([]);

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _headerService: HeaderService,
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
    console.log("_loadRequiredDetails")
    const RETRIEVE_SECTION_DETAILS$ = this._headerService
      .retrieveTopHeaderDetails$().pipe(
        tap(details => {
          console.log("RETRIEVE_SECTION_DETAILS$")
          console.log({ details })
          this.sectionDetails = Immutable.fromJS(details);
        }));

    const LIST_SOCIAL_MEDIA$ = this._socialMediaService
      .listSocialMedia$()
      .pipe(tap(details => {
        console.log("LIST_SOCIAL_MEDIA$")
        console.log({ details })
        this.socialMedias = Immutable.fromJS(details);
      }))

    this._loadRequiredDetailsSubscription = forkJoin([
      RETRIEVE_SECTION_DETAILS$,
      LIST_SOCIAL_MEDIA$
    ])
      .subscribe(_ => {
        if (!this.sectionDetails?.isEmpty() || !this.socialMedias.isEmpty()
          || !this.socialMedias.isEmpty()) {
          this._manuallyTriggerChangeDetection();
        }
      }, err => console.error(err));
  }

  private _manuallyTriggerChangeDetection() {
    this._changeDetectorRef.detectChanges();
  }
}
