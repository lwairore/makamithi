import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { TeamService } from '@sharedModule/services/team.service';
import * as Immutable from 'immutable';
import { forkJoin, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'mak-pit-h1-team-section',
  templateUrl: './h1-team-section.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class H1TeamSectionComponent implements OnInit, AfterViewInit, OnDestroy {
  apAboutSectionDetails = Immutable.fromJS({});

  teams = Immutable.fromJS([]);

  private _loadRequiredDetailsSubscription: Subscription | undefined;

  showLoader = false;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _teamService: TeamService,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._loadRequiredDetails();
  }

  ngOnDestroy(): void {
    this._unsubscribeLoadRequiredDetailsSubscription();
  }

  private _manuallyTriggerChangeDetection() {
    this._changeDetectorRef.detectChanges();
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

    const FETCH_PAGE_NUMBER = '1';

    const AP_ABOUT_SECTION$ = this._teamService
      .retrieveTeamAreaSection$();

    const LIST_TEAMS$ = this._teamService
      .listTeam$(FETCH_PAGE_NUMBER);


    this._loadRequiredDetailsSubscription = forkJoin([
      AP_ABOUT_SECTION$.pipe(
        tap(details => {
          this.apAboutSectionDetails = Immutable.fromJS(details);
        })),

      LIST_TEAMS$.pipe(
        tap(details => {
          const newVal = Immutable.fromJS(details.results);

          this.teams = Immutable.mergeDeep(
            this.teams, newVal);
        })
      ),
    ])
      .subscribe(_ => {
        if (!this.apAboutSectionDetails.isEmpty() || !this.teams.isEmpty()) {
          this.showLoader = false;

          this._manuallyTriggerChangeDetection();
        }
      }, (err) => {
        console.error(err);

        this.showLoader = false;
      });
  }

}
