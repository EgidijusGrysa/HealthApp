import { Injectable } from "@angular/core";
import { Meal } from "../data/meal";
import { FoodGroups } from "../data/foodGroups";
import { Food } from "../data/food";
import { FoodNutritionService } from "../services/foodNutrition";
import { FoodSearch } from "../data/foodSearch";
import { Observable } from "rxjs/Observable";
import { race } from "rxjs/operator/race";

enum TypeOfMeal {
    Breakfast,
    Lunch,
    Dinner,
    EveningSnack
}

@Injectable()
export class MealPlannerService{
    
    foodGroup:FoodGroups;
    breakfast: Meal;
    lunch: Meal;
    dinner: Meal;
    eveSnack: Meal;
    
    
    constructor(private getNut: FoodNutritionService){
        
        let x = TypeOfMeal;
        this.foodGroup = new FoodGroups();
        this.breakfast = new Meal();
        this.lunch = new Meal();
        this.populateBreakfast();
        this.populateLunch();
        this.pullAllNutrients();
        console.log(this.breakfast);
        console.log(this.lunch);
        
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
    // this.getNutritionValues(TypeOfMeal.Breakfast,this.breakfast);
    // this.breakfast.callories = this.calcCalories(this.lunch);
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

        // this.getNutritionValues(TypeOfMeal.Lunch,this.lunch);
        // this.lunch.callories = this.calcCalories(this.lunch);
        
    }

    pullAllNutrients(){
        let allMeals: Meal[] = [
            this.breakfast,
            this.lunch,
        ];
        let ids: string[] = [];
        allMeals.forEach(meal=>{
            
            let id = this.mealPlanToString(true,meal);
            ids = ids.concat(id);
        });
        console.log("Nutrient IDS"+ids);
        return this.getNut.searchManyFood(ids).subscribe(nutrients=>{
            //this.populateNutrition(nutrients.foods);
            console.log(nutrients.foods);
        });
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
                            //console.log(cals);
                            totalCal = totalCal + cals;
                        }
                    });
                }
            
        });
        
        return Math.round(totalCal);
    }

    // getNutritionValues(mealType: TypeOfMeal,meal: Meal){
        
    //     return this.getNut.searchManyFood(id).subscribe(nutrients=>{
    //         this.populateNutrition(nutrients.foods);
    //         //console.log(nutrients.foods);
    //     });
    // }

    populateNutrition(nutrients: any[]){
        var meal;
        // switch(mealType){
        //     case TypeOfMeal.Breakfast:
        //     meal = this.breakfast;
        //     break;
        //     case TypeOfMeal.Lunch:
        //     meal = this.lunch;
        //     break;
        //     case TypeOfMeal.Dinner:
        //     meal = this.dinner;
        //     break;
        //     case TypeOfMeal.EveningSnack:
        //     meal = this.eveSnack;
        //     break;
        // }
        
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

        // switch(mealType){
        //     case TypeOfMeal.Breakfast:
        //     this.breakfast=meal;
        //     break;
        //     case TypeOfMeal.Lunch:
        //     this.lunch=meal;
        //     break;
        //     case TypeOfMeal.Dinner:
        //     this.dinner =meal;
        //     break;
        //     case TypeOfMeal.EveningSnack:
        //     this.eveSnack=meal;
        //     break;
        // }
        
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

}