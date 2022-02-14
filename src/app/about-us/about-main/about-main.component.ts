import { Component, OnInit } from '@angular/core';
import { AboutUsService } from '../about-us.service';

@Component({
  selector: 'mak-pit-about-main',
  templateUrl: './about-main.component.html',
  styles: [
  ],
  providers: [
    AboutUsService,
  ]
})
export class AboutMainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
