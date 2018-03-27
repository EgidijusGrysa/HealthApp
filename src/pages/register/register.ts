import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Validators } from '@angular/forms';
import { RegisterService } from '../../services/register';
import { User } from '../../data/user';
import { VoiceInputService } from '../../services/voiceInput';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Keyboard } from 'ionic-angular/platform/keyboard';
import { PopUpWindowService } from '../../services/popUpWindows';
import { Messages } from '../../data/messages';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { MainMenuTabsPage } from '../main-menu-tabs/main-menu-tabs';
import { MainMenuPage } from '../main-menu/main-menu';
import { HelperService } from '../../services/helperClass';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage implements OnInit {
  voiceActive: any;
  regForm: FormGroup;
  name:string;
  pass: string
  email:string;
  age:string;
  weight:string;
  gender:string;
  messages: Messages;
  isSelected: boolean;

  constructor(private keyboard:Keyboard,
    private helper: HelperService, 
    private alertCntrl:AlertController,
    private regService: RegisterService,
    private voiceInput:VoiceInputService,
    private popUpCntrl: PopUpWindowService,
    private tts:TextToSpeech,
    private navCntrl: NavController,
    private app: App) {
    this.messages = new Messages();
    //this.popUpCntrl.createToastWithClose(this.messages.doubleTap,"bottom");
    this.voiceActive = false;
    this.isSelected = false;
  }

  SpeakText(text: string){
        this.tts.speak({
        text: text,
        locale: 'en-GB',
        rate: 0.77
    })
    .then(() => console.log("Success"))
    .catch((err => console.log(err)));
}


  startVoiceInput(typeOfInput: string){
    console.log("Tapped Mic");
    switch(typeOfInput){
      case "name":
      if(this.voiceActive){
        return this.voiceInput.startLisening().subscribe(x=>{
            this.regForm.patchValue({name: this.voiceInput.deleteWhiteSpace(x)});
        },
          err=>{
            this.popUpCntrl.createToastTimer(err.error.message,"bottom",5000);
            console.log(err);
          },
          ()=>{
            //this.name = "got here";
            console.log("Sucessful");
          });
      }
      break;
      case "pass":
      if(this.voiceActive){
        return this.voiceInput.startLisening().subscribe(x=>{
            this.pass = this.voiceInput.deleteWhiteSpace(x);
        },
          err=>{
            this.popUpCntrl.createToastTimer(err.error.message,"bottom",5000);
            console.log(err);
          },
          ()=>{
            //this.name = "got here";
            console.log("Sucessful");
          });
      }
      break;
      case "email":
      if(this.voiceActive){
        return this.voiceInput.startLisening().subscribe(x=>{
            this.email = this.voiceInput.emailInput(x);
        },
          err=>{
            console.log(err);
          },
          ()=>{
            //this.name = "got here";
            console.log("Sucessful");
          });
      }
      break;
      case "age":
      if(this.voiceActive){
        return this.voiceInput.startLisening().subscribe(x=>{
            this.age = x;
        },
          err=>{
            this.popUpCntrl.createToastTimer(err.error.message,"bottom",5000);
            console.log(err);
          },
          ()=>{
            //this.name = "got here";
            console.log("Sucessful");
          });
      }
      break;
      case "weight":
      if(this.voiceActive){
        return this.voiceInput.startLisening().subscribe(x=>{
            this.weight = x;
        },
          err=>{
            this.popUpCntrl.createToastTimer(err.error.message,"bottom",5000);
            console.log(err);
          },
          ()=>{
            //this.name = "got here";
            console.log("Sucessful");
          });
      }
      break;
      
    }
    
  }
 
  onSubmit(){

    const user = new User(
      this.regForm.value.email,
      this.regForm.value.password,
      this.regForm.value.name,
      this.regForm.value.gender,
      this.regForm.value.weight,
      this.regForm.value.age,
      this.calculateCallories(this.gender,this.regForm.value.age,this.regForm.value.weight));

      this.regService.registerUser(user)
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          this.popUpCntrl.createToastTimer(error.error.message,"bottom",5000);
          console.log(error)}
          ,
        ()=>{
          console.log("moved to new page");
          this.signIn();
        });
      //this.regForm.reset();
  }

  signIn(){
    const user = new User(this.regForm.value.email,this.regForm.value.password);
    this.regService.signIn(user)
    .subscribe(
      data => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('callories', data.callories);
        this.helper.cameFromRegister = true;
        this.app.getRootNav().setRoot(MainMenuTabsPage);
      },
      
      error => {
        this.popUpCntrl.createToastTimer(error.error.message,"bottom",5000);
        console.log(error.error.message);
      }
    );
  }

  calculateCallories(gender: string,age: number, weight: number){
    if(gender == 'f'){
      if(age >= 60){
        return (10.5 * weight) + 596;
      }else if(age < 60){
        return (8.7* weight) + 829;
      }
    }else{
      if(age >= 60){
        return (13.5 * weight) + 487;
      }else if(age < 60){
        return (11.6* weight) + 879;
      }
    }
    
    return null;
  }

  ngOnInit(){
    this.regForm= new FormGroup({
      name: new FormControl(null,Validators.required),
      password: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required, 
        Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')]),
      age: new FormControl(null,Validators.required),
      weight: new FormControl(null, Validators.required),
        gender: new FormControl(null, Validators.required)
    });
  }

}
