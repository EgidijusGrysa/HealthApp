export interface IFoodSearch{
    id: string;
    name: string;
}

export class FoodSearch implements IFoodSearch {
    id:string;
    name:string;
    constructor(obj?: any){
        this.id = obj.ndbno || '';
        this.name = obj.name || '';
    }
}