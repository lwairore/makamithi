import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'mak-pit-shop-details-main',
  templateUrl: './shop-details-main.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopDetailsMainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
