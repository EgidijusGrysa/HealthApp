export interface IBreakfast{
    veg: string[];
    fruit: string[];
    protein: string[];
    dairy: string[];
    drink: string[];
    carbs: string[];

}
export class FoodGroups{
    breakfast: IBreakfast;

    constructor(){
        this.breakfast.veg = ["tomatos","cucumber"];
        this.breakfast.fruit = ["apple","banana"];
        this.breakfast.protein =["egg"];
        this.breakfast.dairy = ["greek yogurt"];
        this.breakfast.drink = ["orange juice","grapefruit juice"];
        this.breakfast.carbs = ["wholegrain bread"," wholegrain oats"];
    }
}