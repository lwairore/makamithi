import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FooterService } from '@sharedModule/services/footer.service';
import { SocialMediaService } from '@sharedModule/services/social-media.service';
import * as Immutable from 'immutable';
import { forkJoin, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'mak-pit-footer',
  templateUrl: './footer.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit, AfterViewInit, OnDestroy {
  sectionDetails = Immutable.fromJS({});

  private _loadRequiredDetailsSubscription: Subscription | undefined;

  showLoader = false;

  socialMedias = Immutable.fromJS([]);

  contactInfos = Immutable.fromJS([]);


  constructor(
    private _footerService: FooterService,
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

  get currentFullYear() {
    return new Date().getFullYear();
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
      .pipe(tap(details => {
        console.log("LIST_SOCIAL_MEDIA$")
        console.log({ details })
        this.socialMedias = Immutable.fromJS(details);
      }));

    const LIST_CONTACT_INFO$ = this._footerService
      .listContactInfo$().pipe(
        tap(details => {
          this.contactInfos = Immutable.fromJS(details);
        }));


    const RETRIEVE_SECTION_DETAILS$ = this._footerService
      .retrieveFooterSectionDetails$().pipe(
        tap(details => {
          this.sectionDetails = Immutable.fromJS(details);
        }));

    this._loadRequiredDetailsSubscription = forkJoin([
      RETRIEVE_SECTION_DETAILS$,
      LIST_SOCIAL_MEDIA$,
      LIST_CONTACT_INFO$
    ])
      .subscribe(_ => {
        if (!this.sectionDetails?.isEmpty() || !this.contactInfos.isEmpty()
          || !this.socialMedias.isEmpty()) {
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
