import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import * as Immutable from 'immutable';
import { forkJoin, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AboutUsService } from '../../../about-us.service';

@Component({
  selector: 'mak-pit-faq',
  templateUrl: './faq.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqComponent implements OnInit, AfterViewInit, OnDestroy {
  collapsing = true;

  faqSectionDetails = Immutable.fromJS({});

  private _loadRequiredDetailsSubscription: Subscription | undefined;

  faqs = [
    {
      title: 'Why Do You Eat Orange Food?',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip exea commodo consequat aute irure aliquam quaerat.'
    },
    {
      title: 'Why Orange Food Is The Best For Health?',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip exea commodo consequat aute irure aliquam quaerat.'
    },
    {
      title: 'Good Food For Good Health?',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip exea commodo consequat aute irure aliquam quaerat.'
    },
  ]

  constructor(
    private _aboutUsService: AboutUsService,
    private _changeDetectorRef: ChangeDetectorRef,
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

  private _manuallyTriggerChangeDetection() {
    this._changeDetectorRef.detectChanges();
  }

  private _loadRequiredDetails() {
    const FAQ_SECTION_DETAILS$ = this._aboutUsService
      .retrieveFaqSection$();

    this._loadRequiredDetailsSubscription = forkJoin([
      FAQ_SECTION_DETAILS$.pipe(
        tap(details => {
          this.faqSectionDetails = Immutable.fromJS(details);
        })),
    ])
      .subscribe(_ => {
        if (!this.faqSectionDetails.isEmpty()) {
          this._manuallyTriggerChangeDetection();
        }
      }, err => console.error(err))

  }
}
