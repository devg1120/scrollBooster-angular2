import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
//import refining from '../../data/refining.json';
//import resources from '../../data/resources.json';
import ScrollBooster from 'scrollbooster';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss']
})
export class CalcComponent implements OnInit {

  ngOnInit() {
  }

  // https://ilyashubin.github.io/scrollbooster/
  // https://codesandbox.io/s/xoork?file=/src/styles.css:0-1118
  //
  // ScrollBooster
  @ViewChild('viewport', { read: ElementRef }) viewport!: ElementRef;
  @ViewChild('content', { read: ElementRef }) content!: ElementRef;
  ngAfterViewInit() {
  console.log(this.viewport);
  console.log(this.content);
    new ScrollBooster({
      viewport: this.viewport.nativeElement,
      content: this.content.nativeElement,
      //scrollMode: 'transform',
      scrollMode: 'native',
      //direction: 'horizontal', // allow only horizontal scrolling
      emulateScroll: true
    });
  }

}
