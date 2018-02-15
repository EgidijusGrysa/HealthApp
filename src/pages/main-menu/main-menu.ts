import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MealPlannerService } from '../../services/mealPlanner';



@IonicPage()
@Component({
  selector: 'page-main-menu',
  templateUrl: 'main-menu.html',
})
export class MainMenuPage {
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public mealPlanner: MealPlannerService) {
    
  }

  acceptFood(){
      console.log(this.mealPlanner.breakfast);
  }

}
