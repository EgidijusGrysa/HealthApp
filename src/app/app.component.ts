import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { MainMenuPage } from '../pages/main-menu/main-menu';
import { NavController } from 'ionic-angular/navigation/nav-controller';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tabsPage: any;

  constructor(platform: Platform, statusBar: StatusBar, 
    splashScreen: SplashScreen
   ) {
     this.tabsPage = TabsPage;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    

  }

  
}

