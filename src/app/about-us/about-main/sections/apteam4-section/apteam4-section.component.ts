import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import * as Immutable from 'immutable';
import { forkJoin, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AboutUsService } from 'src/app/about-us/about-us.service';

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

  constructor(
    private _aboutUsService: AboutUsService,
    private _changeDetectorRef: ChangeDetectorRef,
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
    const TEAM_AREA_SECTION_DETAILS$ = this._aboutUsService
      .retrieveTeamAreaSection$();

    const LIST_SERVICE$ = this._aboutUsService
      .listTeam$();

    this._loadRequiredDetailsSubscription = forkJoin([
      TEAM_AREA_SECTION_DETAILS$.pipe(
        tap(details => {
          this.teamAreaSectionDetails = Immutable.fromJS(details);
        })),
      LIST_SERVICE$.pipe(
        tap(details => {
          this.listTeam = Immutable.fromJS(details);
          console.log(this.listTeam);
        })),
    ])
      .subscribe(_ => {
        if (!this.teamAreaSectionDetails.isEmpty() || !this.listTeam.isEmpty()) {
          this._manuallyTriggerChangeDetection();
        }
      }, err => console.error(err))
  }

  private _manuallyTriggerChangeDetection() {
    this._changeDetectorRef.detectChanges();
  }

}
