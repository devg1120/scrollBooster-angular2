import { Component, OnInit, Input, Output, 
         EventEmitter, SimpleChange, ViewChild, ElementRef } from '@angular/core';
import ScrollBooster from 'scrollbooster';

@Component({
  selector: 'scroll4',
  templateUrl: './scroll4.component.html',
  styleUrls: ['./scroll4.component.scss']
})

export class Scroll4Component implements OnInit {
 
  @Input() data;

  scb :ScrollBooster;
  direction: string = 'none';

  //scb.updateOptions({ emulateScroll: false });
  //scb.updateOptions({ direction: "all" });

  ngOnInit() {
  }

  @ViewChild('viewport', { read: ElementRef }) viewport!: ElementRef;
  @ViewChild('content', { read: ElementRef }) content!: ElementRef;

  ngAfterViewInit() {
    this.scb = new ScrollBooster({
      viewport: this.viewport.nativeElement,
      content: this.content.nativeElement,
      //scrollMode: 'transform',
      scrollMode: 'native',
      direction: 'vertical', 
      bounce: true,
      // Elastic bounce effect factor
      bounceForce: .3,  /* defaulr 0.1 */
      // Scroll friction factor 
      // - how fast scrolling stops after pointer release
      friction: .1,    /* default 0.05 */
      emulateScroll: false,
      textSelection: true
    });
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }){
     // Extract changes to the input property by its name
     let change: SimpleChange = changes['data']; 
     console.log("scroll4 change:", changes);
     console.dir(changes);
     console.log(changes.data.currentValue);
     let dir = changes.data.currentValue;
     if (this.scb) {
     this.scb.updateOptions({ direction: dir });
     }

  // Whenever the data in the parent changes, this method gets triggered. You 
  // can act on the changes here. You will have both the previous value and the 
  // current value here.
  }

}
