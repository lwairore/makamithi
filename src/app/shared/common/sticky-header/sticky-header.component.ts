import { Location } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router, Event as NavigationEvent, NavigationEnd } from '@angular/router';
import { HeaderService } from '@sharedModule/services/header.service';
import * as Immutable from 'immutable';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mak-pit-sticky-header',
  templateUrl: './sticky-header.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StickyHeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() stickerHeaderExtraClasses = '';

  @Input() menuOpen = false;

  @Input() searchBarOpen = false;

  @Input() sidebarOpen = false;

  @Output() setMenuOpen = new EventEmitter<boolean>();

  @Output() setSearchBarOpen = new EventEmitter<boolean>();

  @Output() setSidebarOpen = new EventEmitter<boolean>();

  routerEventSubscription: Subscription | undefined;

  private readonly ROOT_URL = '';

  isRoot = false;

  private _retrieveLogosSubscription: Subscription | undefined;

  logos = Immutable.fromJS({});

  constructor(
    private _router: Router,
    private _location: Location,
    private _changeDetectorRef: ChangeDetectorRef,
    private _headerService: HeaderService,
  ) {
    this.routerEventSubscription
      = this._router.events
        .subscribe(
          (event: NavigationEvent) => {
            if (event instanceof NavigationEnd) {
              if (this._location.path() !== this.ROOT_URL) {
                this.isRoot = false;
              } else {
                this.isRoot = true;
              }
            }
          });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._retrieveLogos();
  }


  ngOnDestroy(): void {
    this._unsubscribeRouterEventSubscription();

    this._unsubscribeRetrieveLogosSubscription();
  }

  private _unsubscribeRetrieveLogosSubscription() {
    if (this._retrieveLogosSubscription instanceof Subscription) {
      this._retrieveLogosSubscription.unsubscribe();
    }
  }

  private _unsubscribeRouterEventSubscription() {
    if (this.routerEventSubscription instanceof Subscription) {
      this.routerEventSubscription.unsubscribe();
    }
  }

  dispatchSetMenuOpenEvt() {
    this.setMenuOpen.emit(!this.menuOpen);
  }

  dispatchSetSearchBarOpenEvt() {
    this.setSearchBarOpen.emit(!this.searchBarOpen);
  }

  dispatchSetSidebarOpenEvt() {
    this.setSidebarOpen.emit(!this.sidebarOpen);
  }

  private _retrieveLogos() {
    this._retrieveLogosSubscription = this._headerService
      .retrieveLogosForStickyHeader$()
      .subscribe(details => {
        this.logos = Immutable.fromJS(details);

        if (!this.logos.isEmpty()) {
          this._manuallyTriggerChangeDetection();
        }
      }, (err) => console.error(err))

  }

  private _manuallyTriggerChangeDetection() {
    this._changeDetectorRef.detectChanges();
  }

}
