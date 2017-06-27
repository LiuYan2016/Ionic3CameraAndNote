import { Component } from '@angular/core';

import { Tab2Page } from '../tab2/tab2';
import { Tab3Page } from '../tab3/tab3';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = Tab2Page;
  tab3Root = Tab3Page;

  constructor() {

  }
}
