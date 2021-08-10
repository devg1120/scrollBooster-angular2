import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CalcComponent } from './calc/calc.component';
import { Scroll2Component } from './scroll2/scroll2.component';
import { Scroll3Component } from './scroll3/scroll3.component';
import { Scroll4Component } from './scroll4/scroll4.component';
import { Scroll5Component } from './scroll5/scroll5.component';
import { Scroll6Component } from './scroll6/scroll6.component';

import { environment } from '../environments/environment';

import {RadioButtonModule} from 'primeng/radiobutton';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {PanelModule} from 'primeng/panel';
import {DividerModule} from 'primeng/divider';
import {SliderModule} from 'primeng/slider';
import { ChipModule } from 'primeng/chip';
import {SplitterModule} from 'primeng/splitter';

import { AngularSplitModule } from 'angular-split';


// サービスを登録するための import
// コンポーネントで DI する場合はこの import は不要
import { CommonService } from './service/common.service';


@NgModule({
imports: [
    BrowserModule, 
    FormsModule,
    RadioButtonModule,
    ButtonModule,
    CardModule,
    PanelModule,
    DividerModule,
    SliderModule,
    ChipModule,
    SplitterModule,
    AngularSplitModule
  ],
  declarations: [
    AppComponent,
    CalcComponent,
    Scroll2Component,
    Scroll3Component,
    Scroll4Component,
    Scroll5Component,
    Scroll6Component,
  ],
  // サービスを登録する
  providers: [
    // コンポーネントで DI する場合はここでの登録は不要
    CommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
