import { Food } from "./food";

export class Meal{
    name: string;
    callories: number;
    drink: Food;
    veg: Food;
    fruit: Food;
    carbs: Food;
    protein: Food;
    fat: string;
userID
   constructor(name?: string,callories?: number, drink?: Food,veg?: Food,fruit?: Food,carbs?: Food,protein?: Food,userID?:string){
       let emptyFood = new Food("none","none",0,0,"none");
        this.name = name || "none";
        this.callories = callories || 0;
        this.drink=drink || emptyFood;
        this.veg=veg || emptyFood;
        this.fruit=fruit || emptyFood;
        this.carbs=carbs || emptyFood;
        this.protein= protein || emptyFood;
        this.userID = userID || "none";
        
   }
     

}