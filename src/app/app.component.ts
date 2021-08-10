import { Component } from '@angular/core';
import { SplitType, Vsplit, Hsplit, VsplitPosition, HsplitPosition }
               from './scroll6/scroll6.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  /******************************************* scrool3 ***/

  scroll3_direction : string = 'none';
  scroll3inputToChild: Object;

  scroll3_onClick() {
    console.log("scroll3 click:", this.scroll3_direction);

  }

  scroll3_onChange(newValue) {
    console.log("scroll3_onChange:",newValue);
    this.scroll3inputToChild = newValue;
  }

  /******************************************* scrool4 ***/

  scroll4_direction : string = 'none';

  scroll4_onClick() {
    console.log("scroll4 click:", this.scroll4_direction);

  }

  /******************************************* scrool5 ***/

  scroll5_direction : string = 'none';
  scroll5_bounceForce : number = 0.3;
  // scroll5_slider_val : number = 0;

  scroll5_onClick() {
    console.log("scroll5 click:", this.scroll5_direction);

  }

  /******************************************* scrool6 ***/

  up_panel_name :string = "UP";
  down_panel_name :string = "DOWN";
  scroll6_direction : string = 'none';
  scroll6_bounceForce : number = 0.3;
  // scroll6_slider_val : number = 0;

  scroll6_splitType1 : Hsplit = { direction : "horizontal", position : "up"};
  scroll6_splitType2 : Hsplit = { direction : "horizontal", position : "down"};

  scroll6_onClick() {
    console.log("scroll6 click:", this.scroll6_direction);

  }
}
