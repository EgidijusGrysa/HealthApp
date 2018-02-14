import { Injectable } from "@angular/core";
import { Meal, MealContent } from "../data/meal";
import { FoodGroups } from "../data/foodGroups";
import { Food } from "../data/food";

@Injectable()
export class MealPlannerService{
    foodGroup: FoodGroups;
    breakfast: Meal;
        m : MealContent;
    constructor(){
        this.populateBreakfast(this.foodGroup.breakfast);
    }

    populateBreakfast(obj: any){
        const ran = Math.random;
        if(ran == 0){

        }
        
    }

    randomFood(foods: Food[]){
        const noOfFoods = foods.length;
        const ran = Math.floor(Math.random() * Math.floor(noOfFoods));
        return foods[ran];      
    }

}