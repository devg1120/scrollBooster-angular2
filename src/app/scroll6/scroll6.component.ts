import { Component, OnInit, Input, Output, OnDestroy,
         EventEmitter, SimpleChange, ViewChild, ElementRef } from '@angular/core';
import ScrollBooster from 'scrollbooster';

import {TableSplitSyncPos} from '../service/common.service';

// subscribe を保持するための Subscription を import
import { Subscription } from 'rxjs';

// サービスを登録するための import
// アプリ全体でのサービスの共有､コンポーネント単位でのサービスの共有に関わらず､ここの import は必要 
import { SplitService } from '../service/split.service';
import { SplitType, Vsplit, Hsplit, VsplitPosition, HsplitPosition } 
           from '../service/split.service';



@Component({
  selector: 'scroll6',
  templateUrl: './scroll6.component.html',
  styleUrls: ['./scroll6.component.scss']
})

export class Scroll6Component implements OnInit {
 
  @Input() name;
  @Input() direction;
  @Input() bounceForce;
  @Input() splitGroup : string;
  @Input() splitType : SplitType;

  scb :ScrollBooster;
  //_direction: string = 'none';
  active: boolean = false;

  //scb.updateOptions({ emulateScroll: false });
  //scb.updateOptions({ direction: "all" });

  /**
   * CommonService の変数の参照を取得するプロパティ
   *
   * @type {String}
   * @memberof Sample1Component
   */
   //public serviceProp: String = 'Initialized by Sample1Component';
  public serviceProp: TableSplitSyncPos ;

  /**
   * subscribe を保持するための Subscription
   *
   * @private
   * @type {Subscription}
   * @memberof Sample1Component
   */
  private subscription!: Subscription;

   /**
   * コンストラクタ. ServiceSample1Component のインスタンスを生成する
   *
   * @param {CommonService} commonService 共通サービス
   * @memberof Sample1Component
   */
  constructor(private splitService: SplitService) { }

  ngOnInit() {
    this.subscribe();
  }
  subscribe() {
    // イベント登録
    // サービスで共有しているデータが更新されたら発火されるイベントをキャッチする
    //this.subscription = this.splitService.sharedDataSource$.subscribe(
    this.subscription = this.splitService.subscribe(
      this.splitGroup,
      msg => {
        
        if (this.scb && this != msg.source) {
             this.serviceProp = msg;
             const state = this.scb.getState();

            switch ( this.splitType.direction) {
            case "vertical":
                  //console.log('vertical');
                  //this.scb.setPosition({x: state.position.x, y: msg.y});
                       this.scb.setPosition({x: msg.x, y: state.position.y});

                  break;
            case "horizontal":
                  //console.log('horizontal');
                  //this.scb.setPosition({x: msg.x, y: state.position.y});
                       this.scb.setPosition({x: state.position.x, y: msg.y});
                  break;
            default:
                  console.log('error other');
            }
        };
      }
    );
  }

  unsubscribe() {
    //  リソースリーク防止のため CommonService から subcribe したオブジェクトを破棄
    this.subscription.unsubscribe();
  }

  @ViewChild('viewport', { read: ElementRef }) viewport!: ElementRef;
  @ViewChild('content',  { read: ElementRef }) content!:  ElementRef;

  ngAfterViewInit() {
    this.scb = new ScrollBooster({
      viewport: this.viewport.nativeElement,
      content: this.content.nativeElement,
      //scrollMode: 'transform',
      scrollMode: 'native',
      //direction: 'vertical', 
      direction: this.direction, 
      bounce: true,
      bounceForce: .3,  /* defaulr 0.1 */
      friction: .1,    /* default 0.05 */
      emulateScroll: false,
      textSelection: true,
      onUpdate: (state) => {
        
        //if (state.isDragging || state.isMoving) {
        //if (state.isDragging) {
        if (state.isMoving) {
             const pos : TableSplitSyncPos = {
                   source: this,
                   x: state.position.x ,
                   y: state.position.y 
                   };
             this.splitService.onNotifySharedDataChanged(this.splitGroup, pos);
          }
          
        },
        onPointerDown: () => {
             this.active = true;
             //this.unsubscribe();
        },
        onPointerUp: () => {
             this.active = false;
             //this.subscribe();
        }
    });

  }


  ngOnChanges(changes: { [property: string]: SimpleChange }){
     if (!(this.scb)) {
        return;
     }

     if (changes['splitType']) {
        console.log("scroll6 splitType drection:", this.splitType.direction);
        console.log("scroll6 splitType position:", this.splitType.position);
     }
     if (changes['direction']) {
        let change: SimpleChange = changes['direction']; 
        let dir = changes.direction.currentValue;
        console.log("scroll6 bounceForce change:", dir);
        this.scb.updateOptions({ direction: dir });
     }
     if (changes['bounceForce']) {
        let change: SimpleChange = changes['bounceForce']; 
        let bfv = changes.bounceForce.currentValue;
        console.log("scroll6 bounceForce change:", bfv);
        this.scb.updateOptions({ bounceForce: bfv });
     }
  }

  /**
   * コンポーネント終了時の処理
   *
   * @memberof Sample1Component
   */
  ngOnDestroy() {
    //  リソースリーク防止のため CommonService から subcribe したオブジェクトを破棄
    this.subscription.unsubscribe();
  }

}
