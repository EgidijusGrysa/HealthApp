export class User {
    name: string;
    email: string;
    password: string;
    height: number;
    weight: number;
    age: number;
    favFood: string[];
    disFood: string[];

    constructor(name: string,email: string,password: string,height:number,
                weight: number, age: number, favFood: string[],
                disFood: string[])
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