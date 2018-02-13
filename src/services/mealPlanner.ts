import { Injectable } from "@angular/core";
import { Meal, MealContent } from "../data/meal";

@Injectable()
export class MealPlannerService{
    breakfast: Meal[];
    m : MealContent;
    constructor(){
        this.populateBreakfast();
    }

    populateBreakfast(){
        
        // this.breakfast = [new Meal("meal 1", 
        // new MealContent("orange juice",null,200),
        // new MealContent[1]("tomatoe",1,null,
        // new MealContent("cucumber",null,100)),
        // new MealContent("banana",1,null))];
    }

}