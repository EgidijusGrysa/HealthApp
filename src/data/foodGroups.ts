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
    lunch: IFoodGroup;
    dinner: IFoodGroup;
    eveSnack: IFoodGroup;
    

    constructor(){
        this.iniBreakfast();
        this.initLunch();
        this.initDinner();
        this.initEveSnack();
       
    }

    iniBreakfast(){
        this.breakfast = {
            veg: [
                new Food("11529","Tomatoe"),
                new Food("11205","Cucumber")],
            fruit: [
                new Food("09003","Apple",0,151),
                new Food("09040","Banana",0,179),
                new Food("09316","Strawberries",0,100),
                new Food("09050","Blueberries",0,100),
                new Food("09302","Raspberries",0,100),
                new Food("09111","Grapefruit",0,150)],
            protein:[
                new Food("01129","Boiled egg"),
                new Food("45067633","Wholegrain oats")],
            drink: [
                new Food("09206","Orange juice"),],
            carbs:[
                new Food("28397","Slice of Wholegrain Bread"),
                ]
        }; 
    }

    initLunch(){
        this.lunch = {
            fruit: [
                new Food("09003","Apple",0,151),
                new Food("09040","Banana",0,179),
                new Food("09316","Strawberries",0,100),
                new Food("09050","Blueberries",0,100),
                new Food("09302","Raspberries",0,100),
                new Food("09111","Grapefruit",0,150)],
            protein: [
                new Food("01256","Greek yogurt",0,100),
                new Food("01015","Cottage cheese",0,120),
                new Food("42128","Turkey ham",2,50),
                new Food("12061","Choice of your favourite nuts",0,30)
            ],
            veg: [
                new Food("11529","Tomatoe"),
                new Food("11205","Cucumber"),
                new Food("11253","Letuce",0,50)
            ],
            carbs: [
                new Food("28397","Slice of Wholegrain Bread")
            ]        
        }
    }
    initDinner(){

    }
    initEveSnack(){

    }
}