import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MealPlannerService } from '../../services/mealPlanner';
import { Meal } from '../../data/meal';



@IonicPage()
@Component({
  selector: 'page-main-menu',
  templateUrl: 'main-menu.html',
})
export class MainMenuPage {
  currCalories : number;
  breakfastMeal: string[];
  lunchMeal: string[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public mealPlanner: MealPlannerService) {
      this.currCalories = 0;
      this.breakfastMeal = [""];
      this.acceptFood();
  }

  acceptFood(){
      
      this.currCalories += this.mealPlanner.calcCalories(this.mealPlanner.breakfast);
      this.currCalories += this.mealPlanner.calcCalories(this.mealPlanner.lunch);
      console.log(this.currCalories);
      this.breakfastMeal = this.mealPlanner.mealPlanToString(false,this.mealPlanner.breakfast);
      this.lunchMeal = this.mealPlanner.mealPlanToString(false,this.mealPlanner.lunch);
      console.log(this.breakfastMeal);
      console.log(this.lunchMeal);

  }

}
