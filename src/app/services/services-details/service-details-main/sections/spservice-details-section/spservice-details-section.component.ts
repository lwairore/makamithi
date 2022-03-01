import { Location } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { convertItemToNumeric, convertItemToString, stringIsEmpty } from '@sharedModule/utilities';
import * as Immutable from 'immutable';
import { SeoSocialShareService } from 'ngx-seo';
import { forkJoin, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ServiceDetailFormatHttpResponse } from 'src/app/services/custom-types';
import { ServiceAreaService } from 'src/app/services/service-area.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'mak-pit-spservice-details-section',
  templateUrl: './spservice-details-section.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SPServiceDetailsSectionComponent implements OnInit, AfterViewInit, OnDestroy {
  listService = Immutable.fromJS([]);

  serviceSidebarSectionDetails = Immutable.fromJS({});

  serviceDetails = Immutable.fromJS({});

  private _loadRequiredDetailsSubscription: Subscription | undefined;

  private _routeParamsSubscription: Subscription | undefined;

  private _routeParams = Immutable.Map({});

  @Output() plansFetched = new EventEmitter<any>();

  constructor(
    private _serviceAreaService: ServiceAreaService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _activatedRoute: ActivatedRoute,
    private _seoSocialShareService: SeoSocialShareService,
    private _location: Location,
  ) { }

  ngOnInit(): void {
    this._extractServiceID();
  }

  ngAfterViewInit(): void {
    this._loadRequiredDetails();
  }

  ngOnDestroy(): void {
    this._unsubscribeRouteParamsSubscription();

    this._unsubscribeLoadRequiredDetailsSubscription();
  }

  private _extractServiceID() {
    this._routeParamsSubscription = this._activatedRoute.params
      .subscribe(params => {
        console.log(params)

        this._routeParams = this._routeParams.set(
          'serviceID',
          convertItemToNumeric(params['serviceID']));
      });
  }

  private _unsubscribeRouteParamsSubscription() {
    if (this._routeParamsSubscription instanceof Subscription) {
      this._routeParamsSubscription.unsubscribe();
    }
  }

  private _unsubscribeLoadRequiredDetailsSubscription() {
    if (this._loadRequiredDetailsSubscription instanceof Subscription) {
      this._loadRequiredDetailsSubscription.unsubscribe();
    }
  }

  private _loadRequiredDetails() {
    const serviceID = convertItemToString(
      this._routeParams.get('serviceID'));

    if (stringIsEmpty(serviceID)) {
      return;
    }

    const SERVICE_SIDEBAR_SECTION_DETAILS$ = this._serviceAreaService
      .retrieveServiceSidebarSection$();

    const SERVICE_DETAILS$ = this._serviceAreaService
      .retrieveServiceDetails$(serviceID);


    const LIST_SERVICE$ = this._serviceAreaService
      .listOurFeatureForSidebarSection$();

    this._loadRequiredDetailsSubscription = forkJoin([
      SERVICE_SIDEBAR_SECTION_DETAILS$.pipe(
        tap(details => {
          this.serviceSidebarSectionDetails = Immutable.fromJS(details);
        })),
      SERVICE_DETAILS$.pipe(
        tap(details => {
          this.serviceDetails = Immutable.fromJS(details);

          this._seoSocialShareService.setData({
            title: details.title,
            keywords: details.keywords,
            description: details.description,
            image: details.serviceDetailPhoto.src,
            imageAuxData: {
              height: 584,
              width: 600,
              alt: details.serviceDetailPhoto.alt,
              secureUrl: details.serviceDetailPhoto.src
            },
            type: 'post',
            author: 'Makamithi Agrovet',
            section: 'article',
            published: details.createdAt,
            modified: details.modifiedDate,
            url: `${environment.hostURL}${this._location.path()}`,
          })
        })),
      LIST_SERVICE$.pipe(
        tap(details => {
          this.listService = Immutable.fromJS(details);
          console.log(this.listService);
        })),
    ])
      .subscribe(_ => {
        if (!this.serviceSidebarSectionDetails.isEmpty() || !this.listService.isEmpty() ||
          !this.serviceDetails.isEmpty()) {

          this.plansFetched.emit(this.serviceDetails.get('plans'));

          this._manuallyTriggerChangeDetection();
        }
      }, err => console.error(err))
  }

  private _manuallyTriggerChangeDetection() {
    this._changeDetectorRef.detectChanges();
  }


}
