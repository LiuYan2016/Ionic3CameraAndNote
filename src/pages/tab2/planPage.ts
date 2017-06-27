import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-plan',
  templateUrl: 'planPage.html'
})
export class PlanPage {
  plan: any = [];
  savingPlan: any = [];
  title: any;
  dropShow = [];
  jsonNameToday = '';
  checked = [];

  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    private file: File,
    public platform: Platform,
  ) {
    this.savingPlan = JSON.parse(JSON.stringify(params.data.plan));

    let plan1 = params.data.plan;
    this.title = plan1[0].Title;
    for (let i = 1; i < plan1.length; i ++){
      this.plan[i-1] = JSON.parse(JSON.stringify(plan1[i]));
      this.savingPlan[i].Sets[1] = {"1": false, "2": false, "3": false}
      console.log(this.savingPlan);
    }
    for (let i = 0; i < this.plan.length; i ++){
      this.dropShow[i] = false;
      this.checked[i] = [false, false, false];
    }
    this.init();
  }

  init(){
    let date = new Date();
    console.log("date", date);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    this.jsonNameToday = year + "-" + month + "-" + day + "-" + this.title.replace(" ", "") + ".json";
    console.log(this.jsonNameToday);
  }

  toggleGroup(index){
    if (this.dropShow[index] == true){
      this.dropShow[index] = false;
      this.plan[index] = JSON.parse(JSON.stringify(this.savingPlan[index + 1]));
    } else {
      this.dropShow[index] = true;
      for (let i = 0; i < this.dropShow.length; i ++){
        if (i != index){
          this.dropShow[i] = false;
          this.plan[i] = JSON.parse(JSON.stringify(this.savingPlan[i + 1]));
        }
      }
    }
  }

  saveChange(index, key, item, value){
   let planItem = this.savingPlan[index + 1];
   if (item == "check") {
      planItem.Sets[1][key] = value;
   } else {
      planItem.Sets[0][key][item] = value;
   }
   console.log(this.savingPlan);

   let text = JSON.stringify(this.savingPlan);
   let self = this;
   if (this.platform.is('cordova')) {
     this.file.createFile(this.file.dataDirectory, this.jsonNameToday, true)
       .then(function(info){
         console.log("created");
         self.file.writeExistingFile(self.file.dataDirectory, self.jsonNameToday, text)
            .then(function(info){
              console.log("writes");
            }, function(e){
              console.log(e);
            });
       }, function(e){
         console.log(e);
       });
   }
  }
}
