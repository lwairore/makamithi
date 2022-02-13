import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import * as Immutable from 'immutable';

@Component({
  selector: 'mak-pit-h1-gallery-section',
  templateUrl: './h1-gallery-section.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class H1GallerySectionComponent implements OnInit, OnDestroy {
  gallerySectionDetails = Immutable.fromJS({});

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void { }

  private _manuallyTriggerChangeDetection() {
    this._changeDetectorRef.detectChanges();
  }
}
