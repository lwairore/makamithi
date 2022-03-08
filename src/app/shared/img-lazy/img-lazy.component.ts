import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { getBoolean } from '@sharedModule/utilities';
import * as Immutable from 'immutable';

@Component({
  selector: 'mak-pit-img-lazy',
  templateUrl: './img-lazy.component.html',
  styles: [
  ]
})
export class ImgLazyComponent implements OnInit {
  @Input() src = '';

  @Input() alt = '';

  @Input() height = '200px';

  @Input() width = '200px';

  @Output() isVisible = new EventEmitter();

  @Input() appearance: ('' | 'line' | 'circle') = '';

  // Modify with setState
  state = Immutable.Map({
    visible: false,
    loaded: false
  });

  getBoolean = getBoolean;


  constructor(
    private _elementRef: ElementRef,
    private _changeDetectionRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this._calcVisibility();
  }

  private _setState(key: string, value: boolean) {
    this.state = this.state.set(key, value);

    this._changeDetectionRef.detectChanges();
  }

  private _calcVisibility() {
    const top = this._elementRef.nativeElement.getBoundingClientRect().top;
    // `getBoundingClientRect` will give us the actual measurement of that element.

    const visibleState = this.getBoolean(this.state.get('visible'));

    if (top <= window.innerHeight && !visibleState) {
      // Change value and render
      this._setState('visible', true);

      // // Emit a custom public event
      // this.customEmit(true);
    }


  }

  @HostListener('window:scroll', ['$event'])
  onscroll(e: any) {
    this._calcVisibility();
  }

  onLoad() {
    this._setState('loaded', true);
  }

}
