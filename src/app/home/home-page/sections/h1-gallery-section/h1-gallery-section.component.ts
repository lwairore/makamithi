import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as Immutable from 'immutable';

@Component({
  selector: 'mak-pit-h1-gallery-section',
  templateUrl: './h1-gallery-section.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class H1GallerySectionComponent implements OnInit {
  gallerySectionDetails = Immutable.fromJS({});

  constructor() { }

  ngOnInit(): void {
  }

}
