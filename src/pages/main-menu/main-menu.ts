import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MealPlannerService } from '../../services/mealPlanner';



@IonicPage()
@Component({
  selector: 'page-main-menu',
  templateUrl: 'main-menu.html',
})
export class MainMenuPage {
  currCalories : number;
  breakfastMeal: string[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public mealPlanner: MealPlannerService) {
      this.currCalories = 0;
      this.breakfastMeal = [""];
  }

  acceptFood(){
      this.mealPlanner.calcCalories(this.mealPlanner.breakfast);
      this.currCalories = this.mealPlanner.breakfast.callories;
      this.breakfastMeal = this.mealPlanner.mealPlanToString(false,this.mealPlanner.breakfast);
      console.log(this.breakfastMeal);

  }

}
