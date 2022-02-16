import { Component, OnInit } from '@angular/core';
import {AboutUsService} from '../../../about-us.service';

@Component({
  selector: 'mak-pit-faq',
  templateUrl: './faq.component.html',
  styles: [
  ]
})
export class FaqComponent implements OnInit {
  collapsing = true;

  faqs = [
    {
      title: 'Why Do You Eat Orange Food?',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip exea commodo consequat aute irure aliquam quaerat.'
    },
    {
      title: 'Why Orange Food Is The Best For Health?',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip exea commodo consequat aute irure aliquam quaerat.'
    },
    {
      title: 'Good Food For Good Health?',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip exea commodo consequat aute irure aliquam quaerat.'
    },
  ]

  constructor(
    private _aboutUsService: AboutUsService
  ) { }

  ngOnInit(): void {
  }

}
