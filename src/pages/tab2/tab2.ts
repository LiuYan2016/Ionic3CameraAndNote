import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GetJson } from '../../providers/getJson';
import { PlanPage } from './planPage'

@Component({
  selector: 'page-tab2',
  templateUrl: 'tab2.html'
})
export class Tab2Page {
  count = 3;
  plans = [];

  constructor(
    public navCtrl: NavController,
    private getJson: GetJson
  ) {
    let self = this;
    for (let i = 0; i < this.count; i ++) {
      getJson.getData("plan" + (i + 1) + ".json").subscribe((data) => {
        self.plans[i] = data;
        console.log(data);
      })
    }
  }

  openPlanPage(plan){
    this.navCtrl.push(PlanPage, {plan: plan});
  }
}
