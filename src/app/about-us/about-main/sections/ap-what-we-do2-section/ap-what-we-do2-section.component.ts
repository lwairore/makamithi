import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AboutUsService } from 'src/app/about-us/about-us.service';

@Component({
  selector: 'mak-pit-ap-what-we-do2-section',
  templateUrl: './ap-what-we-do2-section.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApWhatWeDo2SectionComponent implements OnInit, AfterViewInit {
  listService = [
    {
      image: 'assets/img/icon/icon1.png',
      title: 'Technical support from our agronomists',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt ut labore et dolore magna aliqua.'
    },
    {
      image: 'assets/img/icon/icon2.png',
      title: 'Consultation',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt ut labore et dolore magna aliqua.'
    },
    {
      image: 'assets/img/icon/icon3.png',
      title: 'Farmers training',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt ut labore et dolore magna aliqua.'
    },
    {
      image: 'assets/img/icon/icon1.png',
      title: 'Policy implementation',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt ut labore et dolore magna aliqua.'
    },
    {
      title: 'Business advisory',
      image: 'assets/img/icon/icon2.png',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt ut labore et dolore magna aliqua.'
    },
  ]

  private _loadRequiredDetailsSubscription: Subscription | undefined;

  constructor(
    private _aboutUsService: AboutUsService,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._loadRequiredDetails();
  }

  private _loadRequiredDetails() { }

}
