import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Response } from "@angular/http/src/static_response";
import { Observable } from "rxjs/Observable";
import { Headers } from "@angular/http";
import { User } from "../data/user";


@Injectable()
export class RegisterService{

    constructor(private http: Http){

    }

    registerUser(user: User){
        const body = JSON.stringify(user);
        console.log(body);
        const headers = new Headers({'Content-Type': 'application/json'});
       return this.http.post('http://ec2-52-18-60-87.eu-west-1.compute.amazonaws.com:8080/healthapp/users',body,{headers: headers})
       .map((response: Response) => response.json())
       .catch((error: Response) => Observable.throw(error.json()));
    }

    signIn(user: User){
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
       return this.http.post('http://ec2-52-18-60-87.eu-west-1.compute.amazonaws.com:8080/healthapp/users/signin',body,{headers: headers})
       .map((response: Response) => response.json())
       .catch((error: Response) => Observable.throw(error.json()));
    }

    logout(){
        localStorage.clear();
    }
    getUser(){
        return this.http.get('http://ec2-52-18-60-87.eu-west-1.compute.amazonaws.com:8080/healthapp/users')
        .map((response: Response) => {
            const messages = response.json().obj;
            let transformedMessages: String[] =[];
            for(let message of messages){
                transformedMessages.push(message.name);
            }
            
            return transformedMessages;
        })
        .catch((error: Response)=> Observable.throw(error.json())); 
    }
}