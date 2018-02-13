import { Food } from "./food";

export interface IFood{
    id: string;
    name: string;
}

export interface IBreakfast{
    veg: Food[];
    fruit: Food[];
    protein: Food[];
    dairy: Food[];
    drink: Food[];
    carbs: Food[];

}
export class FoodGroups{
    breakfast: IBreakfast;

    constructor(){
        this.breakfast.veg =   [
            new Food("11529","tomatoe"),
            new Food(" 11205","Cucumber")];
        this.breakfast.fruit = [
            new Food("","apple"),
            new Food("","banana")];
        this.breakfast.protein =[
            new Food("","egg")];
        this.breakfast.dairy = [
            new Food("","greek yogurt")];
        this.breakfast.drink = [
            new Food("","orange juice"),
        new Food("","grapefruit juice")];
        this.breakfast.carbs = [
            new Food("","wholegrain bread"),
            new Food("","wholegrain oats")];
    }
}