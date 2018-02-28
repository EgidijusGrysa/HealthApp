import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { MainMenuPage } from '../pages/main-menu/main-menu';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { MainMenuTabsPage } from '../pages/main-menu-tabs/main-menu-tabs';
import { RegisterPage } from '../pages/register/register';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tabsPage: any;

  constructor(platform: Platform, statusBar: StatusBar, 
    splashScreen: SplashScreen
   ) {
     this.tabsPage = MainMenuTabsPage;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    

  }

  
}

