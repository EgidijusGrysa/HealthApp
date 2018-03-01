export class User {
    name: string;
    email: string;
    password: string;
    sex: string;
    weight: number;
    age: number;
    callories: number

    constructor(email: string,password: string,name?: string,sex?:string,
                weight?: number, age?: number, calls?: number)
    {
        this.name = name;
        this.email = email;
        this.password = password;
        this.sex = sex;
        this.weight = weight;
        this.age = age;
        this.callories = calls;
    }
}