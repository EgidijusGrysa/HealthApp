export interface Nutrients {
    nutrient_id: string;
    nutrient: string;
    unit: string;
    value: number;
    gm: number;
}

export interface IFood {
    id: string;
    name: string;
    quantity: number;
    grams: number;
    nutrients: Nutrients[];
}

export class Food implements IFood {
    id: string;
    name: string;
    quantity: number;
    grams: number;
    nutrients: Nutrients[];

    constructor(id?: string, name?:string,quantity?: number,grams?: number, nutrient?:any) {
        this.id = id || '';
        this.name = name || '';
        this.quantity = quantity || 0;
        this.grams= grams || 0;
        this.nutrients = nutrient || [''];
    }
}