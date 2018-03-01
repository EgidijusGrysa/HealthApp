import { Injectable } from "@angular/core";
import { Meal } from "../data/meal";
import { FoodGroups } from "../data/foodGroups";
import { Food } from "../data/food";
import { FoodNutritionService } from "../services/foodNutrition";
import { Observable } from "rxjs/Observable";
import { race } from "rxjs/operator/race";
import { concat } from "rxjs/operators/concat";
import { LoadingController } from "ionic-angular/components/loading/loading-controller";
import { Headers } from "@angular/http";
import { Http } from "@angular/http";
import { Response } from "@angular/http/src/static_response";

enum TypeOfMeal {
    Breakfast,
    Lunch,
    Dinner,
    EveningSnack
}

@Injectable()
export class MealPlannerService{
    totalCalories: number;
    foodGroup:FoodGroups;
    breakfast: Meal;
    lunch: Meal;
    dinner: Meal;
    eveSnack: Meal;
    
    
    constructor(private getNut: FoodNutritionService,
        private loadingCntrl: LoadingController,
        private http: Http){
        
        let x = TypeOfMeal;
        this.foodGroup = new FoodGroups();
        this.breakfast = new Meal();
        this.lunch = new Meal();
        this.dinner = new Meal();
        this.eveSnack = new Meal();
        this.populateBreakfast();
        this.populateLunch();
        this.populateDiner();
        this.populateEveSnack();    
        
    }
    
    

populateBreakfast()
{
    this.breakfast.protein=this.randomFood(this.foodGroup.breakfast.protein)
    if(this.breakfast.protein.name.includes("egg")){
        this.breakfast.name = "Scrambled or boiled eggs";
        this.breakfast.carbs=this.randomFood(this.foodGroup.breakfast.carbs)
        this.breakfast.drink=this.randomFood(this.foodGroup.breakfast.drink)
        this.breakfast.veg=this.randomFood(this.foodGroup.breakfast.veg)
        this.breakfast.fruit=this.randomFood(this.foodGroup.breakfast.fruit)
        
    }
    else if(this.breakfast.protein.name.includes("oats")){
        this.breakfast.name = "Porridge";
        this.breakfast.protein.grams = 40;
        this.breakfast.fruit=this.randomFood(this.foodGroup.breakfast.fruit)
        this.breakfast.drink=this.randomFood(this.foodGroup.breakfast.drink)        
    }
    
}
    populateLunch(){
        this.lunch.protein = this.randomFood(this.foodGroup.lunch.protein);

        if(this.lunch.protein.name.includes("Greek")){
            this.lunch.fruit = this.randomFood(this.foodGroup.lunch.fruit);
            this.lunch.fruit = this.randomFood(this.foodGroup.lunch.fruit);
        }else if(this.lunch.protein.name.includes("Cottage")){
            this.lunch.fruit = this.randomFood(this.foodGroup.lunch.fruit);
        }else if(this.lunch.protein.name.includes("ham")){
            this.lunch.fruit = this.randomFood(this.foodGroup.lunch.fruit);
            this.lunch.carbs = this.randomFood(this.foodGroup.lunch.carbs);
            this.lunch.veg = this.randomFood(this.foodGroup.lunch.veg);
        }else if(this.lunch.protein.name.includes("nuts")){
            this.lunch.fruit = this.randomFood(this.foodGroup.lunch.fruit);
        }         
    }
    populateDiner(){
        this.dinner.protein = this.randomFood(this.foodGroup.dinner.protein);
        this.dinner.carbs = this.randomFood(this.foodGroup.dinner.carbs);
        this.dinner.veg = this.randomFood(this.foodGroup.dinner.veg);
        this.dinner.drink = this.randomFood(this.foodGroup.dinner.drink);

    }
    populateEveSnack(){
        this.eveSnack.protein = this.randomFood(this.foodGroup.eveSnack.protein);
        
        // if(this.eveSnack.protein.name === this.lunch.protein.name){
        //     this.populateEveSnack();
        //     return;
        // }

        if(this.eveSnack.protein.name.includes("Greek")){
            this.eveSnack.fruit = this.randomFood(this.foodGroup.eveSnack.fruit);
            this.eveSnack.fruit = this.randomFood(this.foodGroup.eveSnack.fruit);
        }else if(this.eveSnack.protein.name.includes("Cottage")){
            this.eveSnack.fruit = this.randomFood(this.foodGroup.eveSnack.fruit);
        }else if(this.eveSnack.protein.name.includes("ham")){
            this.eveSnack.fruit = this.randomFood(this.foodGroup.eveSnack.fruit);
            this.eveSnack.carbs = this.randomFood(this.foodGroup.eveSnack.carbs);
            this.eveSnack.veg = this.randomFood(this.foodGroup.eveSnack.veg);
        }else if(this.eveSnack.protein.name.includes("nuts")){
            this.eveSnack.fruit = this.randomFood(this.foodGroup.eveSnack.fruit);
        }      
    }
    
    mealPlanToString(returnIDs: boolean,meal: Meal){
        let stringMeal: string[]=[];
        if(returnIDs){
            if(meal.protein.name != "none") stringMeal.push(meal.protein.id);
            if(meal.carbs.name != "none") stringMeal.push(meal.carbs.id);
            if(meal.veg.name != "none") stringMeal.push(meal.veg.id);
            if(meal.fruit.name != "none") stringMeal.push(meal.fruit.id);
            if(meal.drink.name != "none") stringMeal.push(meal.drink.id);
        }else{
            if(meal.protein.name != "none") stringMeal.push(meal.protein.name);
            if(meal.carbs.name != "none") stringMeal.push(meal.carbs.name);
            if(meal.veg.name != "none") stringMeal.push(meal.veg.name);
            if(meal.fruit.name != "none") stringMeal.push(meal.fruit.name);
            if(meal.drink.name != "none") stringMeal.push(meal.drink.name);
        }
        return stringMeal;
    }
    calcCalories(meal: Meal){
        let totalCal = 0;
        let food: Food[] = [meal.carbs,
            meal.drink,
            meal.fruit,
            meal.protein,
            meal.veg];
        //console.log(food);
        food.forEach(item=>{
            if(item.name != "none"){
                let grams = item.grams;
                let nutrients = item.nutrients;
                    nutrients.forEach(item=>{
                        if(item.nutrient_id ==="208"){
                            let cals = (item.value /100) * grams;
                            //console.log(cals);
                            totalCal = totalCal + cals;
                        }
                    });
                }
            
        });
        
        return Math.round(totalCal);
    }

    populateNutrition(nutrients: any[]){
        
        this.breakfast = this.getNutrientsForEachFood(this.breakfast,nutrients);
        this.lunch = this.getNutrientsForEachFood(this.lunch,nutrients);
        this.dinner = this.getNutrientsForEachFood(this.dinner,nutrients);
        this.eveSnack = this.getNutrientsForEachFood(this.eveSnack,nutrients);
    
    }

    getNutrientsForEachFood(m: Meal, nutrients: any[]){
        console.log(m);
        let meal = m;
        if(meal.carbs.name != "none"){
            meal.carbs.nutrients = this.getFoodNutrient(meal.carbs.id,nutrients);
        }
        if(meal.drink.name != "none"){
            meal.drink.nutrients = this.getFoodNutrient(meal.drink.id,nutrients);
        }
        if(meal.fruit.name != "none"){
            meal.fruit.nutrients = this.getFoodNutrient(meal.fruit.id,nutrients);
        }
        if(meal.protein.name != "none"){
           meal.protein.nutrients= this.getFoodNutrient(meal.protein.id,nutrients);
        }
        if(meal.veg.name != "none"){
            meal.veg.nutrients= this.getFoodNutrient(meal.veg.id,nutrients);
        }

        return meal;
    }

    //*****====Returns nutrient from arrray based on the string passed in******/
    getFoodNutrient(id: string, nutrient: any[]){
        let x = nutrient.find(y=> 
            y.food.desc.ndbno == id
            
        );
        return x.food.nutrients;
    }

    randomFood(foods: Food[]){
        const noOfFoods = foods.length;
        const ran = Math.floor(Math.random() * Math.floor(noOfFoods));
        return foods[ran];
    }

    randomNum(max){
        return Math.floor(Math.random() * Math.floor(max));
    }
    
    postMeal(userMeal: Object){
        const body = JSON.stringify(userMeal);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:8080/healthapp/meals', body,{headers: headers})
        .map((response: Response) => response.json())
        .catch((err: Response) => Observable.throw(err.json()));
    }

    updateMeals(id: string,meals: Object){
        const body = JSON.stringify(meals);
        const headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
        return this.http.patch('http://localhost:8080/healthapp/usermeals/'+id, body,{headers: headers})
        .map((response: Response) => response.json())
        .catch((err: Response) => Observable.throw(err.json()));
    }


}