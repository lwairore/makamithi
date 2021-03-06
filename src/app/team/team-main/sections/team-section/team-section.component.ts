import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScrollService } from '@sharedModule/services/scroll-service.service';
import { convertItemToNumeric, convertItemToString, ExpectedType, isANumber, whichValueShouldIUse } from '@sharedModule/utilities';
import { generateFakeObjectArray } from '@sharedModule/utilities/generate-fake-objects.util';
import * as Immutable from 'immutable';
import { Subscription } from 'rxjs';
import { TeamService } from 'src/app/team/team.service';

@Component({
  selector: 'mak-pit-team-section',
  templateUrl: './team-section.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamSectionComponent implements OnInit, AfterViewInit, OnDestroy {
  team = Immutable.fromJS([]);

  paginationDetails = Immutable.Map({
    count: 0,
    next: 0,
  });

  private _listTeamSubscription: Subscription | undefined;

  private _routeParamsSubscription: Subscription | undefined;

  isFirstPage = false;

  private _routeParams = Immutable.Map({});

  constructor(
    private _teamService: TeamService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _activatedRoute: ActivatedRoute,
    private _scrollService: ScrollService,
  ) { }

  ngOnInit(): void {
    this._extractCurrentPageNumber();
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this._unsubscribeRouteParamsSubscription();

    this._unsubscribeListTeamSubscription();
  }


  private _resetTeamsOnRouteChange() {
    this.team = Immutable.fromJS([]);
  }

  getTotalNumberOfResults() {
    const TOTAL_RESULTS = this.paginationDetails.get('count');

    return isANumber(TOTAL_RESULTS) ? TOTAL_RESULTS : 0;
  }

  getCurrentLengthOfTeams() {
    const CURRENT_LENGTH = this.team.toList().size;

    return CURRENT_LENGTH;
  }

  fakeObjectArray() {
    const totalNumberOfPages = this.paginationDetails
      .get('totalNumberOfPages');

    if (!isANumber(totalNumberOfPages)) {
      return [];
    }
    return generateFakeObjectArray(totalNumberOfPages);
  };

  private _determineIfWeAreAtTheFirstPage(pageNumber: number) {
    if (pageNumber === 1) {
      if (!this.isFirstPage) {
        this.isFirstPage = true;
      }
    } else {
      if (this.isFirstPage) {
        this.isFirstPage = false;
      }
    }
  }

  markPageNavItemActive(pageNumber: number) {
    console.log({ pageNumber });

    const storedPageNumber = convertItemToNumeric(
      this._routeParams.get('pageNumber'));

    console.log({ storedPageNumber })

    if (!isANumber(storedPageNumber)) {
      return false;
    }

    return (storedPageNumber - 1) === pageNumber;
  }

  private _extractCurrentPageNumber() {
    this._routeParamsSubscription = this._activatedRoute.params
      .subscribe(params => {
        console.log(params);

        const pageNumber = whichValueShouldIUse(
          params['pageNumber'], 1, ExpectedType.NUMBER);

        this._determineIfWeAreAtTheFirstPage(pageNumber);

        this._routeParams = this._routeParams.set(
          'pageNumber', pageNumber);

        this._resetTeamsOnRouteChange();

        this._listTeam();
      });
  }

  fetchPrevious() {
    const CURRENT_PAGE_NUMBER = convertItemToNumeric(
      this._routeParams.get('pageNumber'));

    if (!isANumber(CURRENT_PAGE_NUMBER)) {
      return 0;
    }

    const totalNumberOfPages = convertItemToNumeric(
      this.paginationDetails
        .get('totalNumberOfPages'));

    if (!isANumber(totalNumberOfPages)) {
      return 0;
    }

    if (CURRENT_PAGE_NUMBER === 1) {
      return 0;
    } else {
      return CURRENT_PAGE_NUMBER - 1;
    }
  }

  getMyCurrentPageNumber() {
    const CURRENT_PAGE_NUMBER = convertItemToNumeric(
      this._routeParams.get('pageNumber'));

    if (!isANumber(CURRENT_PAGE_NUMBER)) {
      return 0;
    }

    return CURRENT_PAGE_NUMBER;
  }

  fetchNext() {
    const CURRENT_PAGE_NUMBER = convertItemToNumeric(
      this._routeParams.get('pageNumber'));

    if (!isANumber(CURRENT_PAGE_NUMBER)) {
      return 0;
    }

    const totalNumberOfPages = convertItemToNumeric(
      this.paginationDetails
        .get('totalNumberOfPages'));

    if (!isANumber(totalNumberOfPages)) {
      return 0;
    }

    const NEXT_PAGE = CURRENT_PAGE_NUMBER + 1;

    return (NEXT_PAGE > totalNumberOfPages) ? 0 : NEXT_PAGE;
  }

  private _unsubscribeRouteParamsSubscription() {
    if (this._routeParamsSubscription instanceof Subscription) {
      this._routeParamsSubscription.unsubscribe();
    }
  }

  private _unsubscribeListTeamSubscription() {
    if (this._listTeamSubscription instanceof Subscription) {
      this._listTeamSubscription.unsubscribe();
    }
  }

  private _computeTheTotalNumberOfPages(
    count: number) {
    if (!isANumber(count)) {
      return
    }

    const PAGE_SIZE = 6;

    const totalNumberOfPages = Math.ceil(count / PAGE_SIZE);

    this.paginationDetails = this.paginationDetails.set(
      'count', count);

    this.paginationDetails = this.paginationDetails.set(
      'totalNumberOfPages', totalNumberOfPages);
  }

  private _listTeam() {
    const FETCH_PAGE_NUMBER = convertItemToString(
      this._routeParams.get('pageNumber'));

    this._listTeamSubscription = this._teamService
      .listTeam$(FETCH_PAGE_NUMBER)
      .subscribe(details => {
        console.log({ details })
        // this.team = Immutable.mergeDeepWith(
        //   (oldVal, newVal) => oldVal + newVal,
        //   this.team, details.results
        // )
        const count = convertItemToNumeric(details.count);
        if (isANumber(count)) {
          this._computeTheTotalNumberOfPages(count
          );
        }

        const newVal = Immutable.fromJS(details.results);

        console.log({ newVal })

        this.team = Immutable.mergeDeep(
          this.team, newVal);

        if (!newVal?.isEmpty()) {
          this._manuallyTriggerChangeDetection();
        }

        console.log("this.team");

        console.log(this.team);

        this._scrollToTop();
      })
  }

  private _scrollToTop() {
    this._scrollService.scrollToPosition(0, 0);
  }

  private _manuallyTriggerChangeDetection() {
    this._changeDetectorRef.detectChanges();
  }

}
