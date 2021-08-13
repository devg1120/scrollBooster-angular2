import { Injectable } from '@angular/core';

// イベント発火のための Subject を import
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';

/*******************************************  Split Define **/
/*
export type VsplitPosition = "up"   | "down"  ;
export type HsplitPosition = "left" | "right" ;

export interface Vsplit {
   direction : "vertical";
   position  : VsplitPosition;
}

export interface Hsplit {
   direction : "horizontal";
   position  : HsplitPosition;
}

export type SplitType = Vsplit | Hsplit;
*/
/***********************************************************/


export interface SplitObject {
      req: number;
      syncfunc: any;
}

@Injectable()
export class CommonService {

  /**
   * データの変更を通知するためのオブジェクト
   *
   * @private
   * @memberof SplitService
   */
   //private sharedDataSource = new Subject<TableSplitSyncPos>();
     private sharedDataSource = {};

  /**
   * Subscribe するためのプロパティ
   * `- コンポーネント間で共有するためのプロパティ
   *
   * @memberof SplitService
   */
   //public sharedDataSource$ = this.sharedDataSource.asObservable();
   public sharedDataSource$ = {};

  /**
   * コンストラクタ. SplitService のインスタンスを生成する
   *
   * @memberof SplitService
   */
  constructor() {}

  public subscribe( splitGroup: string,func: any) :Subscription{


     if (!this.sharedDataSource$[splitGroup]) {
          //this.sharedDataSource[splitGroup]  = new Subject<TableSplitSyncPos>();
          this.sharedDataSource[splitGroup]  = new Subject<SplitObject>();
          this.sharedDataSource$[splitGroup] = this.sharedDataSource[splitGroup].asObservable();


     }

     return this.sharedDataSource$[splitGroup].subscribe(func);

  }

  /**
   * データの更新イベント
   *
   * @param {string} updateed 更新データ
   * @memberof SplitService
   */
  //public onNotifySharedDataChanged(splitGroup: string, updateed: TableSplitSyncPos) {
  public onNotifySharedDataChanged(splitGroup: string, updateed: SplitObject) {
    //console.log('[SplitService] onNotifySharedDataChanged fired.',splitGroup);
    //this.sharedDataSource.next(updateed);
    this.sharedDataSource[splitGroup].next(updateed);
  }
}
