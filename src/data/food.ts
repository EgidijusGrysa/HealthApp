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
    nutrients: Nutrients[];
}

export class Food implements IFood {
    id: string;
    name: string;
    nutrients: Nutrients[];

    constructor(id?: string, name?:string, nutrient?:any) {
        this.id = id || '';
        this.name = name || '';
        this.nutrients = nutrient || [];
    }
}