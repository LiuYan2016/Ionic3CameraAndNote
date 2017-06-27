import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-dump',
  templateUrl: 'dump.html'
})
export class DumpPage {
  jsonString: any;
  filename: any;

  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    private file: File,
    public platform: Platform,
  ) {
    this.filename = params.data.fileName;
    let self = this;
    file.readAsText(file.dataDirectory, this.filename)
      .then(function(info){
        console.log(info);
        self.jsonString = info;
      }, function(e){
        console.log(e);
      });
  }
}
