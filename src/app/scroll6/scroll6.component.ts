import { Component, OnInit, Input, Output, OnDestroy,
         EventEmitter, SimpleChange, ViewChild, ElementRef } from '@angular/core';
import ScrollBooster from 'scrollbooster';

import {TableSplitSyncPos} from '../service/common.service';

// subscribe を保持するための Subscription を import
import { Subscription } from 'rxjs';

// サービスを登録するための import
// アプリ全体でのサービスの共有､コンポーネント単位でのサービスの共有に関わらず､ここの import は必要 
import { CommonService } from '../service/common.service';

/*******************************************  Split Define **/

export type HsplitPosition = "up"   | "down"  ;
export type VsplitPosition = "left" | "right" ;

export interface Vsplit {
   direction : "vertical";
   position  : VsplitPosition;
}

export interface Hsplit {
   direction : "horizontal";
   position  : HsplitPosition;
}

export type SplitType = Vsplit | Hsplit;

/***********************************************************/

@Component({
  selector: 'scroll6',
  templateUrl: './scroll6.component.html',
  styleUrls: ['./scroll6.component.scss']
})

export class Scroll6Component implements OnInit {
 
  @Input() name;
  @Input() direction;
  @Input() bounceForce;
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
  constructor(private commonService: CommonService) { }

  ngOnInit() {

    // イベント登録
    // サービスで共有しているデータが更新されたら発火されるイベントをキャッチする
    this.subscription = this.commonService.sharedDataSource$.subscribe(
      msg => {
        
        if (this.scb) {
          if (!this.active) {
             console.log('shared data updated.',this.name,msg);
             this.serviceProp = msg;

            switch ( this.splitType.direction) {
            case "vertical":
                  console.log('vertical');
                  break;
            case "horizontal":
                  console.log('horizontal');
                  const state = this.scb.getState();
                  this.scb.setPosition({x: msg.x, y: state.position.y});
                  break;
            default:
                  console.log('other');
            }
          }
        };
        
      }
    );

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
      textSelection: true,
      onUpdate: (state) => {
      //console.log("*** pos:",state.position.x,state.position.y);
      //console.log("*** offset:",state.dragOffset.x,state.dragOffset.y);
        if (this.active) {
             const pos : TableSplitSyncPos = {
                   x: state.position.x ,
                   y: state.position.y 
                   };
             this.commonService.onNotifySharedDataChanged(pos);
          }
        },
        onPointerDown: () => {
             this.active = true;
        },
        onPointerUp: () => {
             this.active = false;
        }
    });

     if (this.splitType) {
        console.log("scroll6 splitType:", this.splitType.direction);
        console.log("scroll6 splitType:", this.splitType.position);
     }
  }


  ngOnChanges(changes: { [property: string]: SimpleChange }){
     if (!(this.scb)) {
        return;
     }

     if (changes['splitType']) {
        console.log("scroll6 splitType:", this.splitType.direction);
        console.log("scroll6 splitType:", this.splitType.position);
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
