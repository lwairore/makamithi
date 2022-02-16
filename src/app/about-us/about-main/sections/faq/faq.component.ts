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

  faqs = Immutable.fromJS([]);

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

    const LIST_FAQS$ = this._aboutUsService
      .listFaq$();

    this._loadRequiredDetailsSubscription = forkJoin([
      FAQ_SECTION_DETAILS$.pipe(
        tap(details => {
          this.faqSectionDetails = Immutable.fromJS(details);
        })),
      LIST_FAQS$.pipe(
        tap(details => {
          this.faqs = Immutable.fromJS(details);
        })),
    ])
      .subscribe(_ => {
        if (!this.faqSectionDetails.isEmpty() || !this.faqs.isEmpty()) {
          this._manuallyTriggerChangeDetection();
        }
      }, err => console.error(err))

  }
}
