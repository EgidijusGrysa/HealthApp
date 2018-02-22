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
  dinnerMeal: string[];
  eveMeal: string[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public mealPlanner: MealPlannerService) {
      this.currCalories = 0;
      this.breakfastMeal = [""];
      this.acceptFood();
  }

  acceptFood(){
      
      this.currCalories += this.mealPlanner.calcCalories(this.mealPlanner.breakfast);
      this.currCalories += this.mealPlanner.calcCalories(this.mealPlanner.lunch);
      this.currCalories += this.mealPlanner.calcCalories(this.mealPlanner.dinner);
       this.currCalories += this.mealPlanner.calcCalories(this.mealPlanner.eveSnack);
      console.log(this.mealPlanner.calcCalories(this.mealPlanner.breakfast));
      console.log(this.mealPlanner.calcCalories(this.mealPlanner.lunch));
      
      this.breakfastMeal = this.mealPlanner.mealPlanToString(false,this.mealPlanner.breakfast);
      this.lunchMeal = this.mealPlanner.mealPlanToString(false,this.mealPlanner.lunch);
       this.dinnerMeal = this.mealPlanner.mealPlanToString(false,this.mealPlanner.dinner);
     this.eveMeal = this.mealPlanner.mealPlanToString(false,this.mealPlanner.eveSnack);
      
      
      

  }

}
