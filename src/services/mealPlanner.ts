import { Injectable } from "@angular/core";
import { Meal, MealContent } from "../data/meal";
import { FoodGroups } from "../data/foodGroups";
import { Food } from "../data/food";

@Injectable()
export class MealPlannerService{
    foodGroup:FoodGroups;
    breakfast: Meal;
    lunch: Meal;
    dinner: Meal;
    eveSnack: Meal;

    
    constructor(){
        this.foodGroup = new FoodGroups();
        this.breakfast = new Meal();
        this.populateBreakfast();
        
    }

    populateBreakfast(){
        const ran = this.randomNum(2);
        this.breakfast.protein = this.randomFood(this.foodGroup.breakfast.protein);
        if(this.breakfast.protein.name.includes("egg")){
            this.breakfast.name = "Scrambled or boiled eggs"
            this.breakfast.carbs = this.randomFood(this.foodGroup.breakfast.carbs);
            this.breakfast.drink = this.randomFood(this.foodGroup.breakfast.drink);
            this.breakfast.veg = this.randomFood(this.foodGroup.breakfast.veg);
            this.breakfast.fruit = this.randomFood(this.foodGroup.breakfast.fruit);
        } 
        else if(this.breakfast.protein.name.includes("oats")){
            this.breakfast.name = "Porridge";
            this.breakfast.fruit = this.randomFood(this.foodGroup.breakfast.fruit);
            this.breakfast.drink = this.randomFood(this.foodGroup.breakfast.drink);
        }
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