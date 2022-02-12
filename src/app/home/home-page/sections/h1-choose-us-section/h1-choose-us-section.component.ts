import { Component, OnInit } from '@angular/core';
import * as Immutable from 'immutable';

@Component({
  selector: 'mak-pit-h1-choose-us-section',
  templateUrl: './h1-choose-us-section.component.html',
  styles: [
  ]
})
export class H1ChooseUsSectionComponent implements OnInit {
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

  constructor() { }

  ngOnInit(): void {
  }

}
