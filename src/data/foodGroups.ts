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
            new Food(" 09003","apple"),
            new Food(" 09040","banana")];
        this.breakfast.protein =[
            new Food(" 01129","Boiled egg")];
        this.breakfast.dairy = [
            new Food(" 01287","Low fat Greek yogurt")];
        this.breakfast.drink = [
            new Food(" 09206","orange juice"),
        new Food(" 09404","grapefruit juice")];
        this.breakfast.carbs = [
            new Food(" 28397","Slice of Wholegrain Bread"),
            new Food("","wholegrain oats")];
    }
}