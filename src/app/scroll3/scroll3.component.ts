import { Component, OnInit, Input, Output, 
         EventEmitter, SimpleChange, ViewChild, ElementRef } from '@angular/core';
import ScrollBooster from 'scrollbooster';

@Component({
  selector: 'scroll3',
  templateUrl: './scroll3.component.html',
  styleUrls: ['./scroll3.component.scss']
})

export class Scroll3Component implements OnInit {
 
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
      emulateScroll: true
    });
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }){
     // Extract changes to the input property by its name
     let change: SimpleChange = changes['data']; 
     console.log("scroll3 change:", changes);
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
