export interface IMeal {
    name: string;
    drink: MealContent;
    veg: MealContent[];
    fruit: MealContent;
    carbs: MealContent;
    protein: MealContent;
    fat: MealContent;

}

export interface IMealContent{
    name: string;
    quantity: number;
    grams: number;
    
}
export class MealContent implements IMealContent{
    name: string;
    quantity: number;
    grams: number;

    constructor(name: string,quantity?:number, grams?:number){
        this.name = name;
        this.quantity = quantity;
        this.grams = grams;
    }
} 

export class Meal implements IMeal{
    name: string;
    drink: MealContent;
    veg: MealContent[];
    fruit: MealContent;
    carbs: MealContent;
    protein: MealContent;
    fat: MealContent;

   constructor(name?: string, drink?: MealContent,veg?: MealContent[]
    ,fruit?: MealContent,carbs?: MealContent,protein?: MealContent,fat?:MealContent){
        this.name = name;
        this.drink=drink;
        this.veg=veg;
        this.fruit=fruit;
        this.carbs=carbs;
        this.protein= protein;
        this.fat = fat;
   }
     

}