import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import * as Immutable from 'immutable';
import { Subscription } from 'rxjs';
import { HomeService } from 'src/app/home/home.service';

@Component({
  selector: 'mak-pit-h1-choose-us-section',
  templateUrl: './h1-choose-us-section.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class H1ChooseUsSectionComponent implements OnInit, OnDestroy {
  listCoreValue = [
    {
      title: 'Integrity',
      image: 'assets/img/icon/1.png',
      description: 'Sorem ipsum dolor sit amet consecta dipisicing elit sed do eiusmod tempor incidide.'
    },
    {
      title: 'Team work',
      image: 'assets/img/icon/2.png',
      description: 'Sorem ipsum dolor sit amet consecta dipisicing elit sed do eiusmod tempor incidide.'
    },
    {
      title: 'Efficiency',
      image: 'assets/img/icon/3.png',
      description: 'Sorem ipsum dolor sit amet consecta dipisicing elit sed do eiusmod tempor incidide.'
    },
    {
      title: 'Professionalism',
      image: 'assets/img/icon/1.png',
      description: 'Sorem ipsum dolor sit amet consecta dipisicing elit sed do eiusmod tempor incidide.'
    },
    {
      title: 'Respect for all',
      image: 'assets/img/icon/2.png',
      description: 'Sorem ipsum dolor sit amet consecta dipisicing elit sed do eiusmod tempor incidide.'
    },
    {
      title: 'Social Responsible',
      image: 'assets/img/icon/3.png',
      description: 'Sorem ipsum dolor sit amet consecta dipisicing elit sed do eiusmod tempor incidide.'
    },
  ]

  chooseUsSectionDetails = Immutable.fromJS({});

  private _loadRequiredDetailsSubscription: Subscription | undefined;

  constructor(
    private _homeService: HomeService,
    private _changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void { }

  private _unsubscribeLoadRequiredDetailsSubscription() {
    if (this._loadRequiredDetailsSubscription instanceof Subscription) {
      this._loadRequiredDetailsSubscription.unsubscribe();
    }
  }

  private _manuallyTriggerChangeDetection() {
    this._changeDetectorRef.detectChanges();
  }
}
