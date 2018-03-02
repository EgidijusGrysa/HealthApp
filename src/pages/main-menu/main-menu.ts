import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MealPlannerService } from '../../services/mealPlanner';
import { Meal } from '../../data/meal';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { FoodNutritionService } from '../../services/foodNutrition';
import { NutritionPage } from '../nutrition/nutrition';



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
  userID: string;
  userCalls: string;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public mealPlanner: MealPlannerService,
    private loadingCtrl: LoadingController,
    private foodNutrition: FoodNutritionService) {
        
      this.totalCalories = 0;
      
      this.breakfastMeal = [""];
      this.acceptFood();
      this.userID = localStorage.getItem("userId");
      this.userCalls = localStorage.getItem("callories");
  }

  updateMeal(){
    var obj = new Object({
        userID: this.userID,
        dayMeal: new Object({
            date: Date.now(),
            breakfast: this.mealPlanner.breakfast,
            lunch: this.mealPlanner.lunch,
            dinner: this.mealPlanner.dinner,
            eveMeal: this.mealPlanner.eveSnack
        })
      });
      this.mealPlanner.updateMeals(this.userID, obj)
      .subscribe(
        data => {
          console.log(data);
        },
        err => {
            console.log(err);
        }
    )
  }

  mealPost(){
      var obj = new Object({
        userID: this.userID,
        dayMeal: new Object({
            date: Date.now(),
            breakfast: this.mealPlanner.breakfast,
            lunch: this.mealPlanner.lunch,
            dinner: this.mealPlanner.dinner,
            eveMeal: this.mealPlanner.eveSnack
        })
      });
      console.log(obj);
      this.mealPlanner.postMeal(obj)
      .subscribe(
          data => {
            console.log(data);
          },
          err => {
              console.log(err);
          }
      )
  }

  postMeal(string:String){
      switch(string){
          case 'b':
          this.mealPlanner.breakfast.userID = this.userID;
          this.mealPlanner.postMeal(this.mealPlanner.breakfast)
          .subscribe(
            data=> {
                console.log(data);
            },
            err => console.log(err)
          );
          break;
          case 'l':
          this.mealPlanner.postMeal(this.mealPlanner.lunch)
          .subscribe(
            data=> {
                console.log(data);
            },
            err => console.log(err)
          );
          break;
          case 'd':
          this.mealPlanner.postMeal(this.mealPlanner.dinner)
          .subscribe(
            data=> {
                console.log(data);
            },
            err => console.log(err)
          );
          break;
          case 'e':
          this.mealPlanner.postMeal(this.mealPlanner.lunch)
          .subscribe(
            data=> {
                console.log(data);
            },
            err => console.log(err)
          );
          break;
      }
      this.mealPlanner.postMeal(this.mealPlanner.eveSnack)
      .subscribe(
        data=> {
            console.log(data);
        },
        err => console.log(err)
      );
  }

  changeMeal(m: string){
    
    const loading = this.loadingCtrl.create({
      content: 'Updating new meal...'
    });
    
      switch(m){
          case "b":
          this.mealPlanner.breakfast = new Meal();
          this.mealPlanner.populateBreakfast();
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
        this.totalCalories = this.mealPlanner.calc_Total_Callories();
        this.breakfastMeal = this.mealPlanner.mealPlanToString(false,this.mealPlanner.breakfast);
        loading.dismiss();
        
    });

    case "l":
    loading.present();
    this.mealPlanner.lunch = new Meal();
    this.mealPlanner.populateLunch();
    
      ids = this.mealPlanner.mealPlanToString(true,this.mealPlanner.lunch);
      return this.foodNutrition.searchManyFood(ids).subscribe(item =>{
         this.mealPlanner.lunch = this.mealPlanner.getNutrientsForEachFood(this.mealPlanner.lunch,item.foods);
      },
  err=>{
      console.log(err);
      loading.dismiss();
  },
()=>{
    this.totalCalories = this.mealPlanner.calc_Total_Callories();
  this.lunchMeal = this.mealPlanner.mealPlanToString(false,this.mealPlanner.lunch);
  loading.dismiss();
  
});
    case "d":
    loading.present();
    this.mealPlanner.dinner = new Meal();
    this.mealPlanner.populateDiner();
    
      ids = this.mealPlanner.mealPlanToString(true,this.mealPlanner.dinner);
      return this.foodNutrition.searchManyFood(ids).subscribe(item =>{
         this.mealPlanner.dinner = this.mealPlanner.getNutrientsForEachFood(this.mealPlanner.dinner,item.foods);
      },
  err=>{
      console.log(err);
      loading.dismiss();
  },
()=>{
    this.totalCalories = this.mealPlanner.calc_Total_Callories();
  this.dinnerMeal = this.mealPlanner.mealPlanToString(false,this.mealPlanner.dinner);
  loading.dismiss();
  
});
    case "e":
    loading.present();
    this.mealPlanner.eveSnack = new Meal();
    this.mealPlanner.populateEveSnack();
    
      ids = this.mealPlanner.mealPlanToString(true,this.mealPlanner.eveSnack);
      return this.foodNutrition.searchManyFood(ids).subscribe(item =>{
         this.mealPlanner.eveSnack = this.mealPlanner.getNutrientsForEachFood(this.mealPlanner.eveSnack,item.foods);
      },
  err=>{
      console.log(err);
      loading.dismiss();
  },
()=>{
    this.totalCalories = this.mealPlanner.calc_Total_Callories();
  this.eveMeal = this.mealPlanner.mealPlanToString(false,this.mealPlanner.eveSnack);
  loading.dismiss();
  
});    
          
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
      
      this.totalCalories = this.mealPlanner.calc_Total_Callories();
      this.populateNutrient_Vars();
      
      console.log(this.totalCalories);

      this.breakfastMeal = this.mealPlanner.mealPlanToString(false,this.mealPlanner.breakfast);
      this.lunchMeal = this.mealPlanner.mealPlanToString(false,this.mealPlanner.lunch);
      this.dinnerMeal = this.mealPlanner.mealPlanToString(false,this.mealPlanner.dinner);
      this.eveMeal = this.mealPlanner.mealPlanToString(false,this.mealPlanner.eveSnack);

      loading.dismiss();
  });
  }

  populateNutrient_Vars(){
    // let x = this.mealPlanner.calcCalories(this.mealPlanner.breakfast,"418")
    // +this.mealPlanner.calcCalories(this.mealPlanner.lunch,"418")
    // +this.mealPlanner.calcCalories(this.mealPlanner.dinner,"418")
    // +this.mealPlanner.calcCalories(this.mealPlanner.eveSnack,"418");
    // console.log(x);
    // this.nutrientPage.vitaminB12 = x;
    // // this.navCtrl.push(NutritionPage,{
    // //     b12: x
    // // });
  }
}
