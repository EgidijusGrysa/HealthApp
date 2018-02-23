import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MealPlannerService } from '../../services/mealPlanner';
import { Meal } from '../../data/meal';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { FoodNutritionService } from '../../services/foodNutrition';



@IonicPage()
@Component({
  selector: 'page-main-menu',
  templateUrl: 'main-menu.html',
})
export class MainMenuPage {
  totalCalories : number;
  breakfastMeal: string[];
  lunchMeal: string[];
  dinnerMeal: string[];
  eveMeal: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public mealPlanner: MealPlannerService,
    private loadingCtrl: LoadingController,
    private foodNutrition: FoodNutritionService) {
      this.totalCalories = 0;
      this.breakfastMeal = [""];
      this.acceptFood();
  }
  changeMeal(m: string){
      switch(m){
          case "b":
          this.mealPlanner.breakfast = new Meal();
          this.mealPlanner.populateBreakfast();
          const loading = this.loadingCtrl.create({
            content: 'Creating Meals....'
          });
            loading.present();
            let ids = this.mealPlanner.mealPlanToString(true,this.mealPlanner.breakfast);
            return this.foodNutrition.searchManyFood(ids).subscribe(item =>{
               this.mealPlanner.breakfast = this.mealPlanner.getNutrientsForEachFood(this.mealPlanner.breakfast,item.foods);
            },
        err=>{
            console.log(err);
            loading.dismiss();
        },
    ()=>{
        this.breakfastMeal = this.mealPlanner.mealPlanToString(false,this.mealPlanner.breakfast);
        loading.dismiss();
        
    });
    case "l":

          
      }
  }

  acceptFood(){
    const loading = this.loadingCtrl.create({
        content: 'Creating Meals....'
      });
  loading.present();
  let allMeals: Meal[] = [
      this.mealPlanner.breakfast,
      this.mealPlanner.lunch,
      this.mealPlanner.dinner,
      this.mealPlanner.eveSnack
  ];
  //console.log(allMeals);
  let ids: string[] = [];
  allMeals.forEach(meal=>{
      
      let id = this.mealPlanner.mealPlanToString(true,meal);
      ids = ids.concat(id);
  });
  //console.log("Nutrient IDS"+ids);
  return this.foodNutrition.searchManyFood(ids).subscribe(nutrients=>{
      this.mealPlanner.populateNutrition(nutrients.foods);
      console.log(nutrients.foods);
  },
  err => {
      console.log("Error has occured!! "+err);
      loading.dismiss();
  },
  ()=>{
      this.totalCalories += this.mealPlanner.calcCalories(this.mealPlanner.breakfast);
      this.totalCalories += this.mealPlanner.calcCalories(this.mealPlanner.lunch);
      this.totalCalories += this.mealPlanner.calcCalories(this.mealPlanner.dinner);
      this.totalCalories += this.mealPlanner.calcCalories(this.mealPlanner.eveSnack);
      console.log(this.totalCalories);

      this.breakfastMeal = this.mealPlanner.mealPlanToString(false,this.mealPlanner.breakfast);
      this.lunchMeal = this.mealPlanner.mealPlanToString(false,this.mealPlanner.lunch);
      this.dinnerMeal = this.mealPlanner.mealPlanToString(false,this.mealPlanner.dinner);
      this.eveMeal = this.mealPlanner.mealPlanToString(false,this.mealPlanner.eveSnack);

      loading.dismiss();
  });
  }
}
