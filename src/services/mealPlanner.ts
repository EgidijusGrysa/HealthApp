import { Injectable } from "@angular/core";
import { Meal } from "../data/meal";
import { FoodGroups } from "../data/foodGroups";
import { Food } from "../data/food";
import { FoodNutritionService } from "../services/foodNutrition";
import { FoodSearch } from "../data/foodSearch";
import { Observable } from "rxjs/Observable";

@Injectable()
export class MealPlannerService{
    foodGroup:FoodGroups;
    breakfast: Meal;
    lunch: Meal;
    dinner: Meal;
    eveSnack: Meal;

    
    constructor(private getNut: FoodNutritionService){
        this.foodGroup = new FoodGroups();
        this.breakfast = new Meal();
        this.initBreakfast();
        
        
    }

    initBreakfast(){
        this.randomFood(this.foodGroup.breakfast.protein)
        .subscribe(data => {
            this.breakfast.protein = data;
            this.populateBreakfast(data);
        });
    }

populateBreakfast(food: Food)
{
    if(food.name.includes("egg")){
        this.breakfast.name = "Scrambled or boiled eggs"
        this.randomFood(this.foodGroup.breakfast.carbs)
        .subscribe(data => 
            this.breakfast.carbs = data
        );
        this.randomFood(this.foodGroup.breakfast.drink)
        .subscribe(data => 
            this.breakfast.drink = data
        );
        this.randomFood(this.foodGroup.breakfast.veg)
        .subscribe(data => 
            this.breakfast.veg = data
        );
        this.randomFood(this.foodGroup.breakfast.fruit)
        .subscribe(data => 
            this.breakfast.fruit = data
        );
    }
    else if(food.name.includes("oats")){
        this.breakfast.name = "Porridge";
        this.randomFood(this.foodGroup.breakfast.fruit)
        .subscribe(data => 
            this.breakfast.fruit = data
        );
        this.randomFood(this.foodGroup.breakfast.drink)
        .subscribe(data => 
            this.breakfast.drink = data
        );
        
    }
}

    mealPlanToString(meal: Meal){
        let stringMeal: string[]=[];

        if(meal.protein != undefined) stringMeal.push(meal.protein.name);
        if(meal.carbs != undefined) stringMeal.push(meal.carbs.name);
        if(meal.veg != undefined) stringMeal.push(meal.veg.name);
        if(meal.fruit != undefined) stringMeal.push(meal.fruit.name);
        if(meal.drink != undefined) stringMeal.push(meal.drink.name);

        return stringMeal;
    }
    calcCalories(meal: Meal){
        let totalCal = 0;
        let food: Food[] = [meal.carbs,
            meal.drink,
            meal.fruit,
            meal.protein,
            meal.veg];

        food.forEach(item=>{
            let nutrients = item.nutrients;
            nutrients.forEach(item=>{
                if(item.nutrient_id ==="208"){
                    console.log(item.value);
                    totalCal = totalCal + parseInt(item.value);
                }
            });
        });
        this.breakfast.callories = totalCal;       
        console.log(totalCal);
    }

    randomFood(foods: Food[]){
        const noOfFoods = foods.length;
        const ran = Math.floor(Math.random() * Math.floor(noOfFoods));
        const tempFood = foods[ran];
        return this.getNut.searchFood(tempFood.id).map(food=>{
            tempFood.nutrients = food.report.food.nutrients;
            
            return tempFood;
            
        });
        
    }

    randomNum(max){
        return Math.floor(Math.random() * Math.floor(max));
    }

}