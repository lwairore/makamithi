import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as Immutable from 'immutable';

@Component({
  selector: 'mak-pit-apabout4-section',
  templateUrl: './apabout4-section.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class APAbout4SectionComponent implements OnInit {
  apAboutSectionDetails = Immutable.fromJS({});

  constructor() { }

  ngOnInit(): void {
  }

}
