import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router, Event as NavigationEvent, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mak-pit-sticky-header',
  templateUrl: './sticky-header.component.html',
  styles: [
  ]
})
export class StickyHeaderComponent implements OnInit, OnDestroy {
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

  constructor(
    private _router: Router,
    private _location: Location
  ) {
    this.routerEventSubscription
      = this._router.events
        .subscribe(
          (event: NavigationEvent) => {

            if (event instanceof NavigationEnd) {
              console.log('Route changed')
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

  ngOnDestroy(): void {
    this._unsubscribeRouterEventSubscription();
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

}
