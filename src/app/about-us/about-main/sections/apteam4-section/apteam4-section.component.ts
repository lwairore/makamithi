import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as Immutable from 'immutable';
import { Subscription } from 'rxjs';
import { AboutUsService } from 'src/app/about-us/about-us.service';

@Component({
  selector: 'mak-pit-apteam4-section',
  templateUrl: './apteam4-section.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class APTeam4SectionComponent implements OnInit {
  listTeam = Immutable.fromJS([]);

  teamAreaSectionDetails = Immutable.fromJS({});

  private _loadRequiredDetailsSubscription: Subscription | undefined;

  constructor(
    private _aboutUsService: AboutUsService,
  ) { }

  ngOnInit(): void {
  }

}
