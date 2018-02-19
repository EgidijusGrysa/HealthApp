import { Injectable } from "@angular/core";
import { Meal } from "../data/meal";
import { FoodGroups } from "../data/foodGroups";
import { Food } from "../data/food";
import { FoodNutritionService } from "../services/foodNutrition";
import { FoodSearch } from "../data/foodSearch";
import { Observable } from "rxjs/Observable";
import { race } from "rxjs/operator/race";

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
        this.lunch = new Meal();
        this.initBreakfast();
        this.populateLunch();
        
        
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
        this.breakfast.name = "Scrambled or boiled eggs";
        this.breakfast.protein.grams = 75;
        this.randomFood(this.foodGroup.breakfast.carbs)
        .subscribe(data => {
            this.breakfast.carbs = data;
            this.breakfast.carbs.grams = 40;
        });
        this.randomFood(this.foodGroup.breakfast.drink)
        .subscribe(data => {
            this.breakfast.drink = data;
            this.breakfast.drink.grams = 200;
        });
        this.randomFood(this.foodGroup.breakfast.veg)
        .subscribe(data => {
            this.breakfast.veg = data;
            this.breakfast.veg.grams = 80;
        });
        this.randomFood(this.foodGroup.breakfast.fruit)
        .subscribe(data => {
            this.breakfast.fruit = data;
            this.breakfast.fruit.quantity = 1;
        });
    }
    else if(food.name.includes("oats")){
        this.breakfast.name = "Porridge";
        this.breakfast.protein.grams = 40;
        this.randomFood(this.foodGroup.breakfast.fruit)
        .subscribe(data => {
            this.breakfast.fruit = data;
            this.breakfast.fruit.quantity = 1;
        });
        this.randomFood(this.foodGroup.breakfast.drink)
        .subscribe(data => {
            this.breakfast.drink = data;
            this.breakfast.drink.grams = 200;
        });
        
    }
}
    populateLunch(){
        this.lunch.protein = this.randomFood2(this.foodGroup.lunch.protein);

        if(this.lunch.protein.name.includes("Greek")){
            this.lunch.fruit = this.randomFood2(this.foodGroup.lunch.fruit);
            this.lunch.fruit = this.randomFood2(this.foodGroup.lunch.fruit);
        }else if(this.lunch.protein.name.includes("Cottage")){
            this.lunch.fruit = this.randomFood2(this.foodGroup.lunch.fruit);
        }else if(this.lunch.protein.name.includes("ham")){
            this.lunch.fruit = this.randomFood2(this.foodGroup.lunch.fruit);
            this.lunch.carbs = this.randomFood2(this.foodGroup.lunch.carbs);
            this.lunch.veg = this.randomFood2(this.foodGroup.lunch.veg);
        }else if(this.lunch.protein.name.includes("nuts")){
            this.lunch.fruit = this.randomFood2(this.foodGroup.lunch.fruit);
        }

        console.log(this.mealPlanToString(true,this.lunch));
        this.getNutritionValues(this.lunch);
        console.log(this.lunch);

    }

    mealPlanToString(returnIDs: boolean,meal: Meal){
        let stringMeal: string[]=[];
        if(returnIDs){
            if(meal.protein != undefined) stringMeal.push(meal.protein.id);
            if(meal.carbs != undefined) stringMeal.push(meal.carbs.id);
            if(meal.veg != undefined) stringMeal.push(meal.veg.id);
            if(meal.fruit != undefined) stringMeal.push(meal.fruit.id);
            if(meal.drink != undefined) stringMeal.push(meal.drink.id);
        }else{
            if(meal.protein != undefined) stringMeal.push(meal.protein.name);
            if(meal.carbs != undefined) stringMeal.push(meal.carbs.name);
            if(meal.veg != undefined) stringMeal.push(meal.veg.name);
            if(meal.fruit != undefined) stringMeal.push(meal.fruit.name);
            if(meal.drink != undefined) stringMeal.push(meal.drink.name);
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
        console.log(food);
        food.forEach(item=>{
            if(item != undefined){
                let grams = item.grams;
                
                
                    let nutrients = item.nutrients;
                    nutrients.forEach(item=>{
                        if(item.nutrient_id ==="208"){
                            let cals = (item.value /100) * grams;
                            console.log(cals);
                            totalCal = totalCal + cals;
                        }
                    });
                }
            
        });
        
        this.breakfast.callories = Math.round(totalCal);
        console.log(this.breakfast)       
        console.log(totalCal);
    }

    getNutritionValues(meal: Meal){
        let id = this.mealPlanToString(true,meal);
        return this.getNut.searchManyFood(id).subscribe(nutrients=>{
            this.populateNutrition(nutrients.foods);
            //console.log(nutrients.foods);
        });
    }

    populateNutrition(nutrients: any[]){
        let meal = this.lunch;
        if(meal.carbs != undefined){
            meal.carbs.nutrients = this.getFoodNutrient(meal.carbs.id,nutrients);
        }
        if(meal.drink != undefined){
            meal.drink.nutrients = this.getFoodNutrient(meal.drink.id,nutrients);
        }
        if(meal.fruit != undefined){
            meal.fruit.nutrients = this.getFoodNutrient(meal.fruit.id,nutrients);
        }
        if(meal.protein !=undefined){
           meal.protein.nutrients= this.getFoodNutrient(meal.protein.id,nutrients);
        }
        if(meal.veg != undefined){
            meal.veg.nutrients= this.getFoodNutrient(meal.veg.id,nutrients);
        }

        this.lunch = meal;
        
    }

    getFoodNutrient(id: string, nutrient: any[]){
        let x = nutrient.find(y=>
            y.food.desc.ndbno == id
        );
        return x.food.nutrients;
    }

    randomFood2(foods: Food[]){
        const noOfFoods = foods.length;
        const ran = Math.floor(Math.random() * Math.floor(noOfFoods));
        return foods[ran];
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