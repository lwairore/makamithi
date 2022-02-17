import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import * as Immutable from 'immutable';
import { forkJoin, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AboutUsService } from 'src/app/about-us/about-us.service';

@Component({
  selector: 'mak-pit-ap-what-we-do2-section',
  templateUrl: './ap-what-we-do2-section.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApWhatWeDo2SectionComponent implements OnInit, AfterViewInit, OnDestroy {
  listService = [
    {
      image: 'assets/img/icon/icon1.png',
      title: 'Technical support from our agronomists',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt ut labore et dolore magna aliqua.'
    },
    {
      image: 'assets/img/icon/icon2.png',
      title: 'Consultation',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt ut labore et dolore magna aliqua.'
    },
    {
      image: 'assets/img/icon/icon3.png',
      title: 'Farmers training',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt ut labore et dolore magna aliqua.'
    },
    {
      image: 'assets/img/icon/icon1.png',
      title: 'Policy implementation',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt ut labore et dolore magna aliqua.'
    },
    {
      title: 'Business advisory',
      image: 'assets/img/icon/icon2.png',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt ut labore et dolore magna aliqua.'
    },
  ]

  whatWeDoSectionDetails = Immutable.fromJS({});

  private _loadRequiredDetailsSubscription: Subscription | undefined;

  constructor(
    private _aboutUsService: AboutUsService,
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
    const WHAT_WE_DO_SECTION_DETAILS$ = this._aboutUsService
      .retrieveFaqSection$();

    const LIST_FAQS$ = this._aboutUsService
      .listFaq$();

    this._loadRequiredDetailsSubscription = forkJoin([
      WHAT_WE_DO_SECTION_DETAILS$.pipe(
        tap(details => {
          this.faqSectionDetails = Immutable.fromJS(details);
        })),
      LIST_FAQS$.pipe(
        tap(details => {
          this.faqs = Immutable.fromJS(details);
          console.log(this.faqs);
        })),
    ])
      .subscribe(_ => {
        if (!this.faqSectionDetails.isEmpty() || !this.faqs.isEmpty()) {
          this._manuallyTriggerChangeDetection();
        }
      }, err => console.error(err))

  }

}
