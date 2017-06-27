import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { GetJson } from '../../providers/getJson';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  base64Image: any = null;
  profile: any = [];
  savedProfile: any = [];
  dropShow = false;
  jsonNameToday = '';
  displayDay = 0;
  firstTimeFlag = false;

  constructor(
    public navCtrl: NavController,
    private camera: Camera,
    private file: File,
    private storage: Storage,
    public platform: Platform,
    private getJson: GetJson
  ) {
    getJson.getData("profile.json").subscribe((data) => {
      console.log(data);
      this.profile = data;
      for (let i = 0; i < this.profile.length; i ++){
        this.savedProfile[i] = {key: this.profile[i], value: ''};
      }
    })
    storage.get('filename').then((name) => {
      console.log(name);
      if (name)
        this.setLatestImage(name);
    });
    storage.get('firstTime').then((time) => {
      console.log(time);
      if (!time) {
        this.displayDay = 0;
        this.firstTimeFlag = false;
      }
      else {
        this.firstTimeFlag = true;
        let thisTime = new Date();
        this.displayDay = Math.floor((thisTime.getTime() - time) / (24 * 3600 * 1000));
      }
    });
    this.init();
  }

  init(){
    let date = new Date();
    console.log("date", date);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    this.jsonNameToday = year + "-" + month + "-" + day + "-" + "profile.json";
  }

  makeid() {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  setLatestImage(filename){
    let self = this;
    this.file.readAsDataURL(this.file.dataDirectory, filename)
      .then(function(data) {
        console.log("read!!!")
        self.base64Image = data;
        console.log(data);
      }, function(e) {
        console.log("read error!!!")
      });
  }

  takePicture(){
    let self = this;

    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.CAMERA,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
    }).then((imageData) => {
      // imageData is a base64 encoded string
//        this.base64Image = "data:image/jpeg;base64," + imageData;

        var name = imageData.substr(imageData.lastIndexOf('/') + 1);
        var namePath = imageData.substr(0, imageData.lastIndexOf('/') + 1);
        var newName = self.makeid() + name;
        console.log(name, namePath, newName)

        self.file.copyFile(namePath, name, self.file.dataDirectory, newName)
          .then(function(info) {
            console.log("saved!!!");
            self.storage.set('filename', newName);
            self.setLatestImage(newName);
          }, function(e) {
            console.log("error!!!")
          });
      }, (err) => {
      console.log(err);
    });
  }

  toggleGroup(){
    if (this.dropShow == true){
      this.dropShow = false;
    } else {
      this.dropShow = true;
    }
  }

  changeField(i, value){
    if (this.firstTimeFlag == false){
      this.firstTimeFlag = true;
      this.storage.set('firstTime', (new Date()).getTime());
    }

    console.log(this.savedProfile);
//    this.savedProfile[i].value = value;

    let text = JSON.stringify(this.savedProfile);
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
