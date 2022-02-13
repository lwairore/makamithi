import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import * as Immutable from 'immutable';
import { forkJoin, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HomeService } from 'src/app/home/home.service';

@Component({
  selector: 'mak-pit-h1-gallery-section',
  templateUrl: './h1-gallery-section.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class H1GallerySectionComponent implements OnInit, AfterViewInit, OnDestroy {
  gallerySectionDetails = Immutable.fromJS({});

  homeGalley = Immutable.fromJS([]);

  private _loadRequiredDetailsSubscription: Subscription | undefined;


  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _homeService: HomeService,
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
    const RETRIEVE_GALLERY_SECTION$ = this._homeService.retrieveGallerySection$();

    const LIST_HOME_GALLERY$ = this._homeService.listHomeGallerySection$();

    this._loadRequiredDetailsSubscription = forkJoin([
      RETRIEVE_GALLERY_SECTION$.pipe(
        tap(details => this.gallerySectionDetails = Immutable.fromJS(details))
      ),
      LIST_HOME_GALLERY$.pipe(
        tap(details => this.homeGalley = Immutable.fromJS(details)))
    ])
      .subscribe(_ => {
        if (!this.gallerySectionDetails.isEmpty()) {
          this._manuallyTriggerChangeDetection();
        }
      }, err => console.error(err));
  }
}
