import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mak-pit-article-layout',
  templateUrl: './article-layout.component.html',
  styles: [
  ]
})
export class ArticleLayoutComponent implements OnInit {
  @Input() post = {
    url: '',
    image: '',
    title: '',
    text: '',
  }

  constructor() { }

  ngOnInit(): void {
  }

}
