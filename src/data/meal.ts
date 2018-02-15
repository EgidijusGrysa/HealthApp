import { Food } from "./food";

export class Meal{
    name: string;
    callories: number;
    drink: Food;
    veg: Food;
    fruit: Food;
    carbs: Food;
    protein: Food;
    fat: Food;

   constructor(name?: string,callories?: number, drink?: Food,veg?: Food,fruit?: Food,carbs?: Food,protein?: Food,fat?:Food){
        this.name = name;
        this.callories = callories;
        this.drink=drink;
        this.veg=veg;
        this.fruit=fruit;
        this.carbs=carbs;
        this.protein= protein;
        this.fat = fat;
   }
     

}