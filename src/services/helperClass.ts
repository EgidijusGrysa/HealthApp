import { Injectable } from "@angular/core";

Injectable()
export class HelperService{
    cameFromRegister: boolean;
    cameFromLogin: boolean;
    constructor(){
        this.cameFromLogin = false;
        this.cameFromRegister = false;
    }
}