import { Food } from "./food";


export interface IFoodGroup{
    veg?: Food[];
    fruit?: Food[];
    protein?: Food[];
    dairy?: Food[];
    drink?: Food[];
    carbs?: Food[];

}
export class FoodGroups{
    breakfast: IFoodGroup;
    

    constructor(){
        this.iniBreakfast();
       
    }

    iniBreakfast(){
        this.breakfast = {
            veg: [
                new Food("11529","tomatoe"),
                new Food("11205","Cucumber")],
            fruit: [
                new Food("09003","apple"),
                new Food("09040","banana")],
            protein:[
                new Food("01129","Boiled egg"),
                new Food("45067633","wholegrain oats")],
            drink: [
                new Food("09206","orange juice"),],
            carbs:[
                new Food("28397","Slice of Wholegrain Bread"),
                ]
        }; 
    }
}