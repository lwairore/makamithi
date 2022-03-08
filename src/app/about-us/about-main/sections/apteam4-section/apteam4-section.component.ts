import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { TeamService } from '@sharedModule/services/team.service';
import * as Immutable from 'immutable';
import { forkJoin, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'mak-pit-apteam4-section',
  templateUrl: './apteam4-section.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class APTeam4SectionComponent implements OnInit, AfterViewInit, OnDestroy {
  listTeam = Immutable.fromJS([]);

  teamAreaSectionDetails = Immutable.fromJS({});

  private _loadRequiredDetailsSubscription: Subscription | undefined;

  showLoader = false;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _teamService: TeamService,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._unsubscribeLoadRequiredDetailsSubscription();
  }

  ngAfterViewInit(): void {
    this._loadRequiredDetails();
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

    const TEAM_AREA_SECTION_DETAILS$ = this._teamService
      .retrieveTeamAreaSection$();

    const LIST_TEAM$ = this._teamService
      .listTeam$();

    this._loadRequiredDetailsSubscription = forkJoin([
      TEAM_AREA_SECTION_DETAILS$.pipe(
        tap(details => {
          this.teamAreaSectionDetails = Immutable.fromJS(details);
        })),
      LIST_TEAM$.pipe(
        tap(details => {
          this.listTeam = Immutable.fromJS(details);
          console.log(this.listTeam);
        })),
    ])
      .subscribe(_ => {
        if (!this.teamAreaSectionDetails.isEmpty() || !this.listTeam.isEmpty()) {
          this.showLoader = false;

          this._manuallyTriggerChangeDetection();
        }
      }, err => {
        console.error(err);

        this.showLoader = false;
      })
  }

  private _manuallyTriggerChangeDetection() {
    this._changeDetectorRef.detectChanges();
  }

}
