import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mak-pit-apteam4-section',
  templateUrl: './apteam4-section.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class APTeam4SectionComponent implements OnInit {

  private _loadRequiredDetailsSubscription: Subscription | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
