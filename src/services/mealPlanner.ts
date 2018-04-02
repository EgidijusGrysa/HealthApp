import { Injectable } from "@angular/core";
import { Meal } from "../data/meal";
import { FoodGroups } from "../data/foodGroups";
import { Food } from "../data/food";
import { FoodNutritionService } from "../services/foodNutrition";
import { Observable } from "rxjs/Observable";

import { Headers } from "@angular/http";
import { Http } from "@angular/http";
import { Response } from "@angular/http/src/static_response";

@Injectable()
export class MealPlannerService{
    totalCalories: number;
    foodGroup:FoodGroups;

    //displayed meals
    breakfast: Meal;
    lunch: Meal;
    dinner: Meal;
    eveSnack: Meal;

    //old meals to check against
    oldBreak: Meal;
    oldLunch: Meal;
    oldDinner: Meal;
    oldEveSnack: Meal;

    private carbCalories: any;
    private proteinCalories: any;
    private fatCalories:any;
    
    
    constructor(private getNut: FoodNutritionService,
        private http: Http){
        
        this.foodGroup = new FoodGroups();
        this.breakfast = new Meal();
        this.lunch = new Meal();
        this.dinner = new Meal();
        this.eveSnack = new Meal();
        
        this.oldBreak = new Meal();
        this.oldLunch = new Meal();
        this.oldDinner = new Meal();
        this.oldEveSnack = new Meal();

        this.populateBreakfast();
        this.populateLunch();
        this.populateDiner();
        this.populateEveSnack();    
        
    }
    


//Populates breakfast (random) does not populate the same main part of the meal the second time.
populateBreakfast()
{
    this.breakfast.protein=this.randomFood(this.foodGroup.breakfast.protein);

    if(this.oldBreak.protein.name != "none"){
        if(this.oldBreak.protein.name == this.breakfast.protein.name){
            this.populateBreakfast();
            return;
        }
    }
         
    if(this.breakfast.protein.name.includes("egg")){
        this.breakfast.name = "Scrambled or boiled eggs";
        this.breakfast.carbs=this.randomFood(this.foodGroup.breakfast.carbs);
        this.breakfast.drink=this.randomFood(this.foodGroup.breakfast.drink);
        this.breakfast.veg=this.randomFood(this.foodGroup.breakfast.veg);
        this.breakfast.fruit=this.randomFood(this.foodGroup.breakfast.fruit);
        
    }
    else if(this.breakfast.protein.name.includes("oats")){
        this.breakfast.name = "Porridge";
        this.breakfast.protein.grams = 40;
        this.breakfast.fruit=this.randomFood(this.foodGroup.breakfast.fruit)
        this.breakfast.drink=this.randomFood(this.foodGroup.breakfast.drink)        
    }
    
    this.oldBreak = this.breakfast;
        
      
}
    populateLunch(){
        this.lunch.protein = this.randomFood(this.foodGroup.lunch.protein);

        

        if(this.oldLunch.protein.name != "none"){
            if(this.oldLunch.protein.name == this.lunch.protein.name ){
                this.populateLunch();
                return;
            }

            if(this.eveSnack.protein.name == this.lunch.protein.name){
                this.populateLunch();
                return;
            }
        }

        

        if(this.lunch.protein.name.includes("Greek")){
            this.lunch.fruit = this.randomFood(this.foodGroup.lunch.fruit);
            this.lunch.fruit = this.randomFood(this.foodGroup.lunch.fruit);
        }else if(this.lunch.protein.name.includes("Cottage")){
            this.lunch.fruit = this.randomFood(this.foodGroup.lunch.fruit);
        }else if(this.lunch.protein.name.includes("ham")){
            this.lunch.fruit = this.randomFood(this.foodGroup.lunch.fruit);
            this.lunch.carbs = this.randomFood(this.foodGroup.lunch.carbs);
            this.lunch.veg = this.randomFood(this.foodGroup.lunch.veg);
        }else if(this.lunch.protein.name.includes("nuts")){
            this.lunch.fruit = this.randomFood(this.foodGroup.lunch.fruit);
        }
        
        this.oldLunch = this.lunch;
    }
    populateDiner(){

        this.dinner.protein = this.randomFood(this.foodGroup.dinner.protein);

        if(this.oldDinner.protein.name != "none"){
            if(this.oldDinner.protein.name == this.dinner.protein.name ){
                this.populateDiner();
                return;
            }
        }
        
        this.dinner.carbs = this.randomFood(this.foodGroup.dinner.carbs);
        this.dinner.veg = this.randomFood(this.foodGroup.dinner.veg);
        this.dinner.drink = this.randomFood(this.foodGroup.dinner.drink);

        this.oldDinner = this.dinner;
    }
    populateEveSnack(){
        this.eveSnack.protein = this.randomFood(this.foodGroup.eveSnack.protein);

        if(this.oldEveSnack.protein.name != "none"){
            if(this.eveSnack.protein.name == this.oldEveSnack.protein.name ){
                this.populateEveSnack();
                return;
            }
        }
        
        if(this.eveSnack.protein.name === this.lunch.protein.name){
            this.populateEveSnack();
            return;
        }

        if(this.eveSnack.protein.name.includes("Greek")){
            this.eveSnack.fruit = this.randomFood(this.foodGroup.eveSnack.fruit);
            this.eveSnack.fruit = this.randomFood(this.foodGroup.eveSnack.fruit);
        }else if(this.eveSnack.protein.name.includes("Cottage")){
            this.eveSnack.fruit = this.randomFood(this.foodGroup.eveSnack.fruit);
        }else if(this.eveSnack.protein.name.includes("ham")){
            this.eveSnack.fruit = this.randomFood(this.foodGroup.eveSnack.fruit);
            this.eveSnack.carbs = this.randomFood(this.foodGroup.eveSnack.carbs);
            this.eveSnack.veg = this.randomFood(this.foodGroup.eveSnack.veg);
        }else if(this.eveSnack.protein.name.includes("nuts")){
            this.eveSnack.fruit = this.randomFood(this.foodGroup.eveSnack.fruit);
        }
        
        this.oldEveSnack = this.eveSnack;
    }

    calculateCalorie_Distrubution(){
        let carbs = this.calcCalories("n",this.breakfast,"205")
        +   this.calcCalories("n",this.lunch,"205")
        +   this.calcCalories("n",this.dinner,"205")
        +   this.calcCalories("n",this.eveSnack,"205");

        let sugar = this.calcCalories("n",this.breakfast,"269")
        +   this.calcCalories("n",this.lunch,"269")
        +   this.calcCalories("n",this.dinner,"269")
        +   this.calcCalories("n",this.eveSnack,"269");

        let protein = this.calcCalories("n",this.breakfast,"203")
        +   this.calcCalories("n",this.lunch,"203")
        +   this.calcCalories("n",this.dinner,"203")
        +   this.calcCalories("n",this.eveSnack,"203");

        let fats = this.calcCalories("n",this.breakfast,"204")
        +   this.calcCalories("n",this.lunch,"204")
        +   this.calcCalories("n",this.dinner,"204")
        +   this.calcCalories("n",this.eveSnack,"204");

        

        this.carbCalories = carbs *4;
        this.proteinCalories = protein *4;
        this.fatCalories = fats *9;
    }
    
    mealPlanToString(returnIDs: boolean,meal: Meal){
        let stringMeal: string[]=[];
        if(returnIDs){
            if(meal.protein.name != "none") stringMeal.push(meal.protein.id);
            if(meal.carbs.name != "none") stringMeal.push(meal.carbs.id);
            if(meal.veg.name != "none") stringMeal.push(meal.veg.id);
            if(meal.fruit.name != "none") stringMeal.push(meal.fruit.id);
            if(meal.drink.name != "none") stringMeal.push(meal.drink.id);
        }else{
            if(meal.protein.name != "none") {
                let x = meal.protein.name + ", " + meal.protein.grams + " grams";
                stringMeal.push(x);
            };
            if(meal.carbs.name != "none") {
                let x = meal.carbs.name + ", " + meal.carbs.grams + " grams";
                stringMeal.push(x);
            }
            if(meal.veg.name != "none") {
                let x = meal.veg.name + ", " + meal.veg.grams + " grams";
                stringMeal.push(x);
            }
            if(meal.fruit.name != "none") {
                let x = meal.fruit.name + ", " + meal.fruit.grams + " grams";
                stringMeal.push(x);
            }
            if(meal.drink.name != "none") {
                let x = meal.drink.name + ", " + meal.drink.grams + " grams";
                stringMeal.push(x);
            }
                
        }
        return stringMeal;
    }

    //returns total number of specified nutrient values thats consumed
    calcCalories(type: string,meal: Meal,nutrientID: string){
        let totalCal = 0;
        let food: Food[] = [meal.carbs,
            meal.drink,
            meal.fruit,
            meal.protein,
            meal.veg];
        //console.log(food);
        food.forEach(item=>{
            if(item.name != "none"){
                let grams = item.grams;
                let nutrients = item.nutrients;
                    nutrients.forEach(item=>{
                        if(item.nutrient_id ===nutrientID){
                            let cals = (item.value /100) * grams;
                            //console.log(cals);
                            totalCal = totalCal + cals;
                        }
                    });
                }
            
        });
        if(type==="n"){
            return totalCal;
        }else if(type === "c"){
            return Math.round(totalCal);
        }
        
    }

    calc_Total_Callories(){
        return this.calcCalories("c",this.breakfast,"208") 
      + this.calcCalories("c",this.lunch,"208") 
      + this.calcCalories("c",this.dinner,"208")
      + this.calcCalories("c",this.eveSnack,"208");
    }

    populateNutrition(nutrients: any[]){
        
        this.breakfast = this.getNutrientsForEachFood(this.breakfast,nutrients);
        this.lunch = this.getNutrientsForEachFood(this.lunch,nutrients);
        this.dinner = this.getNutrientsForEachFood(this.dinner,nutrients);
        this.eveSnack = this.getNutrientsForEachFood(this.eveSnack,nutrients);
    
    }

    getNutrientsForEachFood(m: Meal, nutrients: any[]){
        console.log(m);
        let meal = m;
        if(meal.carbs.name != "none"){
            meal.carbs.nutrients = this.getFoodNutrient(meal.carbs.id,nutrients);
        }
        if(meal.drink.name != "none"){
            meal.drink.nutrients = this.getFoodNutrient(meal.drink.id,nutrients);
        }
        if(meal.fruit.name != "none"){
            meal.fruit.nutrients = this.getFoodNutrient(meal.fruit.id,nutrients);
        }
        if(meal.protein.name != "none"){
           meal.protein.nutrients= this.getFoodNutrient(meal.protein.id,nutrients);
        }
        if(meal.veg.name != "none"){
            meal.veg.nutrients= this.getFoodNutrient(meal.veg.id,nutrients);
        }

        return meal;
    }

    //*****====Returns nutrient from arrray based on the string passed in******/
    getFoodNutrient(id: string, nutrient: any[]){
        let x = nutrient.find(y=> 
            y.food.desc.ndbno == id
            
        );
        return x.food.nutrients;
    }

    //picks random food out of an array of foods
    randomFood(foods: Food[]){
        const noOfFoods = foods.length;
        const ran = Math.floor(Math.random() * Math.floor(noOfFoods));
        return foods[ran];
    }

    randomNum(max){
        return Math.floor(Math.random() * Math.floor(max));
    }

    getProteinCalories(){
        return this.proteinCalories;
    }
    getCarbsCalories(){
        return this.carbCalories;
    }
    getFatCalories(){
        return this.fatCalories;
    }

    getCurrentMealForUser(){
        let userID = localStorage.getItem("userId");
        const headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
        return this.http.get("http://localhost:8080/healthapp/usermeals/"+userID,{headers:headers})
        .map((response: Response) =>{
            return response.json().obj;
        }).catch((error: Response)=> Observable.throw(error.json())); 
    }
    
    //sends the meals to database for saving
    postMeal(userMeal: Object){
        const body = JSON.stringify(userMeal);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:8080/healthapp/meals', body,{headers: headers})
        .map((response: Response) => response.json())
        .catch((err: Response) => Observable.throw(err.json()));
    }

    //updates meals in the database ***********Not working YET*********
    updateMeals(id: string,meals: Object){
        const body = JSON.stringify(meals);
        const headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
        return this.http.patch('http://localhost:8080/healthapp/usermeals/'+id, body,{headers: headers})
        .map((response: Response) => response.json())
        .catch((err: Response) => Observable.throw(err.json()));
    }


}