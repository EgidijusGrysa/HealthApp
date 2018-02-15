import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { FoodSearch } from "../data/foodSearch";
import { Response } from "@angular/http/src/static_response";
import { Injectable } from "@angular/core";
import { MealPlannerService } from "./mealPlanner";

@Injectable()
export class FoodNutritionService {
    apiKey: string;

    constructor(private http: Http, private mealPlanner: MealPlannerService){
        this.apiKey = 'OuE6Vc7B5eD46QM5Xb1w0Iyb9859WFBEAQYw0NuD';
    }

    searchFood(): Observable<FoodSearch[]>{
        return this.http.get('https://api.nal.usda.gov/ndb/search/?format=json&q=butter&sort=n&max=25&offset=0&api_key=OuE6Vc7B5eD46QM5Xb1w0Iyb9859WFBEAQYw0NuD')
        .map((respone: Response)=> 
        respone.json().list.item.map(item => {
            return new FoodSearch(item);
        })
        ).catch((error: Response)=> Observable.throw(error.json()));
    }
}

