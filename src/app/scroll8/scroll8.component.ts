import { Component, OnInit, Input, Output, OnDestroy,
         EventEmitter, SimpleChange, ViewChild, ElementRef } from '@angular/core';
import ScrollBooster from 'scrollbooster';

import {SplitObject} from '../service/common.service';

// subscribe を保持するための Subscription を import
import { Subscription } from 'rxjs';

// サービスを登録するための import
// アプリ全体でのサービスの共有､コンポーネント単位でのサービスの共有に関わらず､ここの import は必要 
import { CommonService } from '../service/common.service';
import { SplitType, Vsplit, Hsplit, VsplitPosition, HsplitPosition } 
           from '../service/split.service';



@Component({
  selector: 'scroll8',
  templateUrl: './scroll8.component.html',
  styleUrls: ['./scroll8.component.scss']
})

export class Scroll8Component implements OnInit {
 
  @Input() name;
  @Input() direction;
  @Input() bounceForce;
  @Input() splitGroup : string;
  @Input() splitType : SplitType;

  scb :ScrollBooster;
  splitsync : any;

  //_direction: string = 'none';
  active: boolean = false;



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
    this.subscribe();
  }


  subscribe() {
    // イベント登録
    // サービスで共有しているデータが更新されたら発火されるイベントをキャッチする
    //this.subscription = this.splitService.sharedDataSource$.subscribe(
    this.subscription = this.commonService.subscribe(
      this.splitGroup,
      msg => {
        
      if (this.scb && this != msg.syncfunc) {
          this.splitsync = msg.syncfunc;

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
      friction: 0.05,    /* default 0.05 */
      emulateScroll: true,
      textSelection: false,
      onUpdate: (state) => {
        
        if (state.isMoving) {
                  //const pos : TableSplitSyncPos = {
                  //      source: this,
                  //      x: state.position.x ,
                  //      y: state.position.y 
                  //      };
                  //this.splitService.onNotifySharedDataChanged(this.splitGroup, pos);
                  if (this.splitsync) {
                       this.splitsync(state.position.x , state.position.y);
                  }
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
     this.regsync(1);
    }


 regsync(n: number) {
    
    this.commonService.onNotifySharedDataChanged(this.splitGroup, {req: n ,syncfunc: 
    
         (x: number, y: number) => {
                 const state = this.scb.getState();

                 switch ( this.splitType.direction) {
                 case "vertical":
                       //console.log('vertical');
                       //this.scb.setPosition({x: state.position.x, y: msg.y});
                            this.scb.setPosition({x: x, y: state.position.y});

                       break;
                 case "horizontal":
                       //console.log('horizontal');
                       //this.scb.setPosition({x: msg.x, y: state.position.y});
                            this.scb.setPosition({x: state.position.x, y: y});
                       break;
                 default:
                       console.log('error other');
                 }

        }
    
    
    });
  
  }


  ngOnChanges(changes: { [property: string]: SimpleChange }){
     if (!(this.scb)) {
        return;
     }

     if (changes['splitType']) {
        console.log("scroll8 splitType drection:", this.splitType.direction);
        console.log("scroll8 splitType position:", this.splitType.position);
     }
     if (changes['direction']) {
        let change: SimpleChange = changes['direction']; 
        let dir = changes.direction.currentValue;
        console.log("scroll8 bounceForce change:", dir);
        this.scb.updateOptions({ direction: dir });
     }
     if (changes['bounceForce']) {
        let change: SimpleChange = changes['bounceForce']; 
        let bfv = changes.bounceForce.currentValue;
        console.log("scroll8 bounceForce change:", bfv);
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
