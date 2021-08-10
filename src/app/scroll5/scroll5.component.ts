import { Component, OnInit, Input, Output, 
         EventEmitter, SimpleChange, ViewChild, ElementRef } from '@angular/core';
import ScrollBooster from 'scrollbooster';

@Component({
  selector: 'scroll5',
  templateUrl: './scroll5.component.html',
  styleUrls: ['./scroll5.component.scss']
})

export class Scroll5Component implements OnInit {
 
  @Input() direction;
  @Input() bounceForce;

  scb :ScrollBooster;
  //_direction: string = 'none';

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

  /*
  ngOnChanges(changes: { [property: string]: SimpleChange }){
     // Extract changes to the input property by its name
     let change: SimpleChange = changes['direction']; 
     console.log("scroll5 change:", changes);
     console.dir(changes);
     console.log(changes.direction.currentValue);
     let dir = changes.direction.currentValue;
     if (this.scb) {
     this.scb.updateOptions({ direction: dir });
     }

  }
  */

  ngOnChanges(changes: { [property: string]: SimpleChange }){
     if (!(this.scb)) {
        return;
     }

     if (changes['direction']) {
        let change: SimpleChange = changes['direction']; 
        let dir = changes.direction.currentValue;
        console.log("scroll5 bounceForce change:", dir);
        this.scb.updateOptions({ direction: dir });
     }
     if (changes['bounceForce']) {
        let change: SimpleChange = changes['bounceForce']; 
        let bfv = changes.bounceForce.currentValue;
        console.log("scroll5 bounceForce change:", bfv);
        this.scb.updateOptions({ bounceForce: bfv });
     }
  }
}
