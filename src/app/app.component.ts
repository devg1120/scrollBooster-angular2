import { Component } from '@angular/core';
import { SplitType, Vsplit, Hsplit, VsplitPosition, HsplitPosition } from './service/common.service';


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

  scroll6_splitgroup_1 = "group1"
  scroll6_panel_name_1up   = "1 UP";
  scroll6_panel_name_1down = "1 DOWN";
  scroll6_panel_name_2up   = "2 UP";
  scroll6_panel_name_2down = "2 DOWN";

  //up_panel_name1 :string = "1 UP";
  //down_panel_name1 :string = "1 DOWN";
  //up_panel_name2 :string = "2 UP";
  //down_panel_name2 :string = "2 DOWN";

  scroll6_direction : string = 'horizontal';
  scroll6_bounceForce : number = 0.7;
  // scroll6_slider_val : number = 0;

  //scroll6_splitType1 : Hsplit = { direction : "horizontal", position : "up"};
  //scroll6_splitType2 : Hsplit = { direction : "horizontal", position : "down"};
  scroll6_splitType1 : Vsplit = { direction : "vertical", position : "up"};
  scroll6_splitType2 : Vsplit = { direction : "vertical", position : "down"};

  scroll6_onClick() {
    console.log("scroll6 click:", this.scroll6_direction);

  }

  /******************************************* scrool7 ***/

  scroll7_splitgroup_1 = "group71"
  scroll7_splitgroup_2 = "group72"
  scroll7_splitgroup_3 = "group73"
  scroll7_splitgroup_4 = "group74"
  scroll7_panel_name_1up   = "1 UP";
  scroll7_panel_name_1down = "1 DOWN";
  scroll7_panel_name_2up   = "2 UP";
  scroll7_panel_name_2down = "2 DOWN";
  scroll7_direction : string = 'horizontal';
  scroll7_bounceForce : number = 0.7;
  // scroll6_slider_val : number = 0;

  //scroll7_splitType1 : Hsplit = { direction : "horizontal", position : "up"};
  //scroll7_splitType2 : Hsplit = { direction : "horizontal", position : "down"};
  scroll7_splitType1 : Vsplit = { direction : "vertical", position : "up"};
  scroll7_splitType2 : Vsplit = { direction : "vertical", position : "down"};

  scroll7_onClick() {
    console.log("scroll7 click:", this.scroll7_direction);

  }
}
