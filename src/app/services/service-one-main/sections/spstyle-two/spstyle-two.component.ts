import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mak-pit-spstyle-two',
  templateUrl: './spstyle-two.component.html',
  styles: [
  ]
})
export class SPStyleTwoComponent implements OnInit {
  listService = [
    {
      image: 'assets/img/service/4.jpg',
      title: 'Technical support from our agronomists',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt ut labore et dolore magna aliqua.'
    },
    {
      image: 'assets/img/service/5.jpg',
      title: 'Consultation',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt ut labore et dolore magna aliqua.'
    },
    {
      image: 'assets/img/service/3.jpg',
      title: 'Farmers training',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt ut labore et dolore magna aliqua.'
    },
    {
      image: 'assets/img/service/6.jpg',
      title: 'Policy implementation',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt ut labore et dolore magna aliqua.'
    },
    {
      title: 'Business advisory',
      image: 'assets/img/service/7.jpg',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt ut labore et dolore magna aliqua.'
    },
  ]


  constructor() { }

  ngOnInit(): void {
  }

}
