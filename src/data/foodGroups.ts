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
                new Food("01129","Boiled egg",2,150),
                new Food("45067633","Wholegrain oats",0,40)],
                drink: [
                    new Food("09206","Orange juice",0,200),
                    new Food("09016","Apple juice",0,200),
                    new Food("09123","Grapefruit juice",0,200)
                ],
            carbs:[
                new Food("28397","Slice of Wholegrain Bread",2,35),
                ]
        }; 
    }

    initLunch(){
        this.lunch = {
            fruit: [
                new Food("09003","1 medium Apple",0,151),
                new Food("09040","1 medium Banana",0,179),
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
                new Food("28397","2 Slices of Wholegrain Bread",2,35)
            ]        
        }
    }
    initDinner(){
        this.dinner = {
            protein: [
                new Food("07933","Chicken breast",1,160),
                new Food("13439","Lean beef steak ",0,100),
                new Food("15209","Salmon fillet",0,100),
                new Food("05192","Turkey breast",0,100)
            ],
            carbs: [
                new Food("20036","Brown rice",0,50),
                new Food("20050","Basmati rice",0,50),
                new Food("11367","Potaoes, boiled without skin",0,100),
                new Food("20124","Wholegrain pasta",0,50),
                new Food("11876","Sweet potatoes",0,200)
            ],
            veg: [
                new Food("11091","Brocolli, boiled or steamed",0,100),
                new Food("11125","Carrots, boiled or steamed",0,100)
                //new Food("Cabbage","Cabbaged, boiled",0,150)
            ],
            drink: [
                new Food("09206","Orange juice",0,200),
                new Food("09016","Apple juice",0,200),
                new Food("09123","Grapefruit juice",0,200)
            ]

        }
    }
    initEveSnack(){
        this.eveSnack = {
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
                new Food("42128","Turkey ham",2,50)
               
            ],
            veg: [
                new Food("11529","Tomatoe"),
                new Food("11205","Cucumber"),
                new Food("11253","Letuce",0,50)
            ],
            carbs: [
                new Food("28397","Slice of Wholegrain Bread",2,35)
            ]        
        }
    }
}