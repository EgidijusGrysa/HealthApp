import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { FoodSearch } from "../data/foodSearch";
import { Response } from "@angular/http/src/static_response";
import { Injectable } from "@angular/core";


@Injectable()
export class FoodNutritionService {
    apiKey: string;

    constructor(private http: Http){
        this.apiKey = 'iY6KJuFlBHFKnrXr5MvTxifHEwMxPUcvs7q9driR';
    }

    searchFood(id): Observable<any>{
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

    searchManyFood(id:string[]): Observable<any>{
        const url = 'https://api.nal.usda.gov/ndb/V2/reports/?';
        let ids:string[] = [];
        id.forEach(item=> {
            ids.push(`ndbno=${item}`);
        });
        console.log(ids);
         const s = ids.join('&');
        console.log(s);
        const params: string = [
            s,
            `type=b`,
            `format=json`,
            `api_key=${this.apiKey}`
        ].join('&');

        const queryUrl = `${url}${params}`;

        return this.http.get(queryUrl)
        .map((response: Response) => response.json())
        .catch((error: Response) => Observable.throw(error.json()));
    }

    
}

