import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mak-pit-blog-main',
  templateUrl: './blog-main.component.html',
  styles: [
  ]
})
export class BlogMainComponent implements OnInit {
  posts = [
    {
      "id": "1",
      "title": "Monthly Web Development To Update React Hooks Cons Wether Says",
      "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
      "image": "assets/img/blog/b1.jpg",
      "url": "/monthly-web-development-to-update-react-hooks-cons-wether-says-1",
      "date": "January 1, 2022"
    },
    {
      "id": "2",
      "title": "Yearly Web Development To Update React Hooks Cons Wether Says",
      "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
      "image": "assets/img/blog/b2.jpg",
      "url": "/monthly-web-development-to-update-react-hooks-cons-wether-says-2",
      "date": "January 1, 2022"
    },
    {
      "id": "3",
      "title": "Monthly Web Development To Update React Hooks Cons Wether Says",
      "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
      "image": "assets/img/blog/b3.jpg",
      "url": "/monthly-web-development-to-update-react-hooks-cons-wether-says-3",
      "date": "January 1, 2022"
    },
    {
      "id": "4",
      "title": "Practical Suggestions To Improve Usability Landing Sages With Animation From Slides.",
      "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
      "image": "assets/img/blog/b4.jpg",
      "url": "/practical-suggestions-to-improve-usability-landing-sages-with-animation-from-slides",
      "date": "January 1, 2022"
    }
  ]


  constructor() { }

  ngOnInit(): void {
  }

}
