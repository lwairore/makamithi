import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mak-pit-blog-details-main',
  templateUrl: './blog-details-main.component.html',
  styles: [
  ]
})
export class BlogDetailsMainComponent implements OnInit {
  blogDetails = {
    "id": "3",
    "title": "Monthly Web Development To Update React Hooks Cons Wether Says",
    "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
    "image": "assets/img/blog/b3.jpg",
    "url": "/monthly-web-development-to-update-react-hooks-cons-wether-says-3",
    "date": "January 1, 2022"
  }

  constructor() { }

  ngOnInit(): void {
  }

}
