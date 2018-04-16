import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Toggle } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { MainMenuPage } from '../pages/main-menu/main-menu';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { MainMenuTabsPage } from '../pages/main-menu-tabs/main-menu-tabs';
import { RegisterPage } from '../pages/register/register';
import { NutritionPage } from '../pages/nutrition/nutrition';
import { SettingsPage } from '../pages/settings/settings';
import { SettingsService } from '../services/settings';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tabsPage: any;
  settingsPage: SettingsPage;
 // @ViewChild('nav') nav:NavController;

  constructor(platform: Platform, statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private menu: MenuController,
    private settings:SettingsService,
    
   ) {
     this.tabsPage = TabsPage;
         platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
}
// onLoad(page: any){
//   this.nav.setRoot(page);
//   this.menu.close();
// }

toggleSpeechInput(toggle: Toggle){
  this.settings.setSpeechInput(toggle.checked);
}

toggleSpeechOutput(toggle:Toggle){
  this.settings.setSpeechOutput(toggle.checked);
}

checkInput(){
  return this.settings.isSpeechInput_ON();
}

checkOutput(){
  return this.settings.isSpeechOutput_ON();
}


}

