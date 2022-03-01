import { Injectable } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor(private viewportScroller: ViewportScroller) { }

  scrollToAnchor(anchor: string) {
    this.viewportScroller.scrollToAnchor(anchor);
  }

  scrollToPosition(x: number, y: number) {
    this.viewportScroller.scrollToPosition([x, y]);
  }
}