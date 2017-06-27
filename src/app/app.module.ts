import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http'
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { Tab2Page } from '../pages/tab2/tab2';
import { PlanPage } from '../pages/tab2/planPage';
import { Tab3Page } from '../pages/tab3/tab3';
import { DumpPage } from '../pages/tab3/dump';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { IonicStorageModule } from '@ionic/storage';
import { GetJson } from '../providers/getJson';

@NgModule({
  declarations: [
    MyApp,
    Tab2Page,
    HomePage,
    TabsPage,
    PlanPage,
    Tab3Page,
    DumpPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Tab2Page,
    HomePage,
    TabsPage,
    PlanPage,
    Tab3Page,
    DumpPage
  ],
  providers: [
    Camera,
    StatusBar,
    SplashScreen,
    File,
    GetJson,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
