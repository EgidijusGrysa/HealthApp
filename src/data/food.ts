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
    nutrients: any[];
}

export class Food implements IFood {
    id: string;
    name: string;
    quantity: number;
    grams: number;
    nutrients: any[];

    constructor(id?: string, name?:string,quantity?: number,grams?: number, nutrient?:any) {
        this.id = id || null;
        this.name = name || '';
        this.quantity = quantity || 0;
        this.grams= grams || 0;
        this.nutrients = nutrient || [''];
    }
}