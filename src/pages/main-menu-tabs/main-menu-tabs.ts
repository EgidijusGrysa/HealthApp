import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MainMenuPage } from '../main-menu/main-menu';
import { NutritionPage } from '../nutrition/nutrition';

@Component({
  selector: 'page-main-menu-tabs',
  templateUrl: 'main-menu-tabs.html',
})
export class MainMenuTabsPage {
menuPage = MainMenuPage;
nutPage = NutritionPage;
  

}
