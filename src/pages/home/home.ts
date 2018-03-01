import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MainMenuPage } from '../main-menu/main-menu';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { RegisterService } from '../../services/register';
import { User } from '../../data/user';
import { FoodNutritionService } from '../../services/foodNutrition';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
speechList: Array<string> = [];
name: string;
user: User;

m : String[];
  constructor(private regUser: RegisterService,
    public navCtrl: NavController,
    private speech: SpeechRecognition,
    private food: FoodNutritionService) {
    //this.user = new User();
  }

  userRegister(){
    
    console.log(this.name);
    
    this.user.name = this.name;
    console.log("Gothere===============");
    console.log(this.user);
    
    this.regUser.registerUser(this.user)
    .subscribe(
      data => console.log(data),
      error => console.log(error)
    );
}

  getFood(){
    // this.food.searchFood().subscribe((food: FoodSearch[])=>{
    //   console.log(food);
    // })
  }
  getUser(){
   
    this.regUser.getUser()
    .subscribe(
      (message: String[]) =>{
        this.m = message;
      }
    );
    console.log(this.m);
  }

  isRecognitionAvailable():Promise<boolean>{
    const isAvailable = this.speech.isRecognitionAvailable();
    return isAvailable;
  } 
  startListening(){
    if(this.isRecognitionAvailable){
      this.speech.startListening().subscribe(data=> this.speechList = data,
      error=> console.log(error));
    }
}
}
