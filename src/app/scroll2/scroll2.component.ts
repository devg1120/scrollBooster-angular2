import { Component, OnInit, Input, Output, 
         EventEmitter, ViewChild, ElementRef } from '@angular/core';
import ScrollBooster from 'scrollbooster';

@Component({
  selector: 'scroll2',
  templateUrl: './scroll2.component.html',
  styleUrls: ['./scroll2.component.scss']
})
export class Scroll2Component implements OnInit {

  ngOnInit() {
  }

  @ViewChild('viewport', { read: ElementRef }) viewport!: ElementRef;
  @ViewChild('content', { read: ElementRef }) content!: ElementRef;

  ngAfterViewInit() {
    new ScrollBooster({
      viewport: this.viewport.nativeElement,
      content: this.content.nativeElement,
      //scrollMode: 'transform',
      scrollMode: 'native',
      direction: 'horizontal', // allow only horizontal scrolling
      emulateScroll: true
    });
  }

}
