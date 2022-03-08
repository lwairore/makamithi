import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { HeaderService } from '@sharedModule/services/header.service';
import { SocialMediaService } from '@sharedModule/services/social-media.service';
import * as Immutable from 'immutable';
import { forkJoin, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'mak-pit-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() sidebarOpen = false;

  @Output() setSidebarOpen = new EventEmitter<boolean>();

  contactInfos = Immutable.fromJS({});

  services = Immutable.fromJS([]);

  socialMedias = Immutable.fromJS([]);

  private _loadRequiredDetailsSubscription: Subscription | undefined;

  constructor(
    private _headerService: HeaderService,
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

  dispatchSetSidebarOpenEvt() {
    this.setSidebarOpen.emit(!this.sidebarOpen);
  }

  private _loadRequiredDetails() {
    const LIST_CONTACT_INFO$ = this._headerService
      .listContactInfo$().pipe(
        tap(details => {
          this.contactInfos = Immutable.fromJS(details);
        }));

    const LIST_SOCIAL_MEDIA$ = this._socialMediaService
      .listSocialMedia$()
      .pipe(tap(details => {
        console.log("LIST_SOCIAL_MEDIA$")
        console.log({ details })
        this.socialMedias = Immutable.fromJS(details);
      }))

    const LIST_SERVICE$ = this._headerService
      .listService$().pipe(
        tap(details => {
          this.services = Immutable.fromJS(details);
        }))

    this._loadRequiredDetailsSubscription = forkJoin([
      LIST_CONTACT_INFO$,
      LIST_SERVICE$,
      LIST_SOCIAL_MEDIA$,
    ])
      .subscribe(_ => {
        if (!this.contactInfos?.isEmpty() || !this.services.isEmpty()
          || !this.socialMedias.isEmpty()) {
          this._manuallyTriggerChangeDetection();
        }
      }, err => console.error(err));
  }

  private _manuallyTriggerChangeDetection() {
    this._changeDetectorRef.detectChanges();
  }

}
