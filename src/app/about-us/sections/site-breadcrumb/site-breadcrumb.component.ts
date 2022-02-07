import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mak-pit-site-breadcrumb',
  templateUrl: './site-breadcrumb.component.html',
  styles: [
  ]
})
export class SiteBreadcrumbComponent implements OnInit {
  @Input() pageTitle = '';

  constructor() { }

  ngOnInit(): void {
  }

}
