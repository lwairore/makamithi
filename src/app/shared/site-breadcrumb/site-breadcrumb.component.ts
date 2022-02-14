import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mak-pit-site-breadcrumb',
  templateUrl: './site-breadcrumb.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteBreadcrumbComponent implements OnInit {
  @Input() pageTitle = 'Blog';

  constructor() { }

  ngOnInit(): void {
  }

}
