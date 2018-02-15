import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { FoodSearch } from "../data/foodSearch";
import { Response } from "@angular/http/src/static_response";
import { Injectable } from "@angular/core";


@Injectable()
export class FoodNutritionService {
    apiKey: string;

    constructor(private http: Http){
        this.apiKey = 'OuE6Vc7B5eD46QM5Xb1w0Iyb9859WFBEAQYw0NuD';
    }

    searchFood(id){
        const url = 'https://api.nal.usda.gov/ndb/reports/?';
        const params: string = [
            `ndbno=${id}`,
            `type=b`,
            `format=json`,
            `api_key=${this.apiKey}`
        ].join('&');

        const queryUrl = `${url}${params}`;

        return this.http.get(queryUrl)
        .map((response: Response) => response.json())
        .catch((error: Response) => Observable.throw(error.json()));
    }

    searchFood2(query: string) {
        const url = 'https://api.nal.usda.gov/ndb/search/?format=json&';
        const params: string = [
          `q=${query}`,
          `sort=r`, // sort by relevance 
          `max=2`, // maximum number of results
          `offset=0`, // beginning row in the result set to begin
          `ds=Standard%20Reference`, // 'Standard Reference' or 'Branded Food Products
          `api_key=${this.apiKey}` // Your api key
        ].join('&');
    
        const queryUrl = `${url}${params}`;
    
        return this.http.get(queryUrl).map((response: Response) =>
          response.json().list ? response.json().list.item.map(item => {
            return new FoodSearch(item);
          })
        : []);
      }
    
}

