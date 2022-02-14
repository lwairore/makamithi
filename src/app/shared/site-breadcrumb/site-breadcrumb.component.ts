import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import * as Immutable from 'immutable';

@Component({
  selector: 'mak-pit-site-breadcrumb',
  templateUrl: './site-breadcrumb.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteBreadcrumbComponent implements OnInit {
  @Input() pageTitle = 'Blog';

  siteBreadcrumbDetails = Immutable.fromJS({});

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  private _manuallyTriggerChangeDetection() {
    this._changeDetectorRef.detectChanges();
  }
}
