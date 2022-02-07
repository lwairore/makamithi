import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mak-pit-tab-panel',
  templateUrl: './tab-panel.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabPanelComponent implements OnInit {
  @Input() panels: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
