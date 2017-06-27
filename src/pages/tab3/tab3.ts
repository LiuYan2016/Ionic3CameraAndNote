import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GetJson } from '../../providers/getJson';
import { DumpPage } from './dump'
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-tab3',
  templateUrl: 'tab3.html'
})
export class Tab3Page {
  count = 3;
  plans = [];
  jsonFiles = [];

  constructor(
    public navCtrl: NavController,
    private getJson: GetJson,
    private file: File
  ) {
    let self = this;
    file.listDir(file.dataDirectory, '')
      .then(function(info){
        for (let i = 0; i < info.length; i ++){
          if (info[i].name.search("json") != -1)
            self.jsonFiles.push(info[i].name);
        }
        console.log(self.jsonFiles);
      }, function(e){
        console.log(e);
      });
  }

  openDumpPage(index){
    this.navCtrl.push(DumpPage, {fileName: this.jsonFiles[index]});
  }
}
