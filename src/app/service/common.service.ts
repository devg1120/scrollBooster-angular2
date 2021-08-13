import { Injectable } from '@angular/core';

// イベント発火のための Subject を import
import { Subject } from 'rxjs';

/*******************************************  Split Define **/

//export type HsplitPosition = "up"   | "down"  ;
//export type VsplitPosition = "left" | "right" ;
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

/***********************************************************/


export interface TableSplitSyncPos {
      //source: string;
      source: Object;
      x: number;
      y: number;
}

@Injectable()
export class CommonService {

  /**
   * データの変更を通知するためのオブジェクト
   *
   * @private
   * @memberof CommonService
   */
   //private sharedDataSource = new Subject<string>();
  private sharedDataSource = new Subject<TableSplitSyncPos>();

  /**
   * Subscribe するためのプロパティ
   * `- コンポーネント間で共有するためのプロパティ
   *
   * @memberof CommonService
   */
  public sharedDataSource$ = this.sharedDataSource.asObservable();

  /**
   * コンストラクタ. CommonService のインスタンスを生成する
   *
   * @memberof CommonService
   */
  constructor() {}

  /**
   * データの更新イベント
   *
   * @param {string} updateed 更新データ
   * @memberof CommonService
   */
  //public onNotifySharedDataChanged(updateed: string) {
  public onNotifySharedDataChanged(updateed: TableSplitSyncPos) {
    console.log('[CommonService] onNotifySharedDataChanged fired.');
    this.sharedDataSource.next(updateed);
  }
}
