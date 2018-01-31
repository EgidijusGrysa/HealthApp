export class User {
    name: string;
    email: string;
    password: string;
    height: number;
    weight: number;
    age: number;
    favFood: string[];
    disFood: string[];

    constructor(email: string,password: string,name?: string,height?:number,
                weight?: number, age?: number, favFood?: string[],
                disFood?: string[])
    {
        this.name = name;
        this.email = email;
        this.password = password;
        this.height = height;
        this.weight = weight;
        this.age = age;
        this.favFood = favFood;
        this.disFood = disFood;
    }
}